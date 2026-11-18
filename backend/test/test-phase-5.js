// backend/test/test-phase-5.js
// Dedicated Phase 5 Verification: Official Notices & S3 Secure Document Upload Microservices

const assert = require('assert');

// In-memory mock DynamoDB for isolated unit testing
const mockDb = new Map();
const db = require('../utils/db');

// Composite key generator: `${institutionId}#${sortKey}`
const getKey = (item) => {
  const sk = item.noticeId || item.applicationId || item.inquiryId || item.recruiterId || item.passId || item.cognitoId || item.index;
  return `${item.institutionId}#${sk}`;
};

db.put = async (tableName, item) => {
  const table = mockDb.get(tableName) || new Map();
  const key = getKey(item);
  table.set(key, JSON.parse(JSON.stringify(item)));
  mockDb.set(tableName, table);
  return { Attributes: item };
};

db.get = async (tableName, keyObj) => {
  const table = mockDb.get(tableName);
  if (!table) return {};
  const key = getKey(keyObj);
  const item = table.get(key);
  return { Item: item ? JSON.parse(JSON.stringify(item)) : undefined };
};

db.delete = async (tableName, keyObj) => {
  const table = mockDb.get(tableName);
  if (!table) return {};
  const key = getKey(keyObj);
  table.delete(key);
  return {};
};

db.query = async (params) => {
  const table = mockDb.get(params.TableName);
  if (!table) return { Items: [] };

  const instId = params.ExpressionAttributeValues[':inst'];
  let items = Array.from(table.values()).filter(item => item.institutionId === instId);

  if (params.FilterExpression && params.ExpressionAttributeValues[':cat']) {
    const catVal = params.ExpressionAttributeValues[':cat'];
    items = items.filter(item => item.category === catVal);
  }

  return { Items: items };
};

console.log('========================================================================');
console.log('🧪 VERIFYING PHASE 5: NOTICES & S3 DOCUMENT UPLOAD MICROSERVICES');
console.log('========================================================================\n');

let passed = 0;
let total = 0;

const runTest = async (name, fn) => {
  total++;
  try {
    await fn();
    console.log(`✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
  }
};

const runAllTests = async () => {
  const GazetteNotice = require('../models/GazetteNotice');
  const s3 = require('../utils/s3');

  const publishNoticeHandler = require('../functions/notices/publish-notice').main;
  const listNoticesHandler = require('../functions/notices/list-notices').main;
  const deleteNoticeHandler = require('../functions/notices/delete-notice').main;
  const getUploadUrlHandler = require('../functions/uploads/get-upload-url').main;

  // ===========================================================================
  // 5.1: Gazette Notice Model & Category Validation
  // ===========================================================================
  await runTest('5.1 Notice Model Validation: Category Constraints & Defaults', async () => {
    // Missing title or invalid category
    try {
      await GazetteNotice.create('INST_001', {
        title: 'Invalid Category Notice',
        category: 'random_category_xyz',
        summary: 'This must fail'
      });
      assert.fail('Should fail due to invalid category');
    } catch (err) {
      assert.ok(err.message.includes('Validation failed'));
    }

    // Valid notice creation
    const notice = await GazetteNotice.create('INST_001', {
      title: 'End-Semester Examination Schedule - Winter 2026',
      category: 'examination',
      summary: 'Timetable published for all B.Tech and M.Tech departments.',
      isUrgentTicker: true
    });

    assert.ok(notice.noticeId.startsWith('NOT-'));
    assert.strictEqual(notice.institutionId, 'INST_001');
    assert.strictEqual(notice.category, 'examination');
    assert.strictEqual(notice.isUrgentTicker, true);
    assert.ok(notice.publishedAt > 0);
  });

  // ===========================================================================
  // 5.2: Gazette Notices Listing & Category Filtering
  // ===========================================================================
  await runTest('5.2 Notice Listing, Category Filtering, & Deletion', async () => {
    // Academic notice
    await GazetteNotice.create('INST_001', {
      title: 'Curriculum Revision Workshop',
      category: 'academics',
      summary: 'Faculty development seminar'
    });

    // Placement notice
    const placNotice = await GazetteNotice.create('INST_001', {
      title: 'TCS Digital Recruitment Drive Announced',
      category: 'placements',
      summary: 'Registration opens for final year students'
    });

    // List all
    const allNotices = await GazetteNotice.listByInstitution('INST_001');
    assert.ok(allNotices.length >= 2);

    // Filter by placements
    const placementNotices = await GazetteNotice.listByInstitution('INST_001', { category: 'placements' });
    const hasPlacement = placementNotices.every(n => n.category === 'placements');
    assert.strictEqual(hasPlacement, true, 'Category filter must only return placement notices');

    // Remove notice
    await GazetteNotice.remove('INST_001', placNotice.noticeId);
    const retrievedAfterDelete = await GazetteNotice.get('INST_001', placNotice.noticeId);
    assert.strictEqual(retrievedAfterDelete, null, 'Deleted notice must no longer exist');
  });

  // ===========================================================================
  // 5.3: Strict Cross-Tenant Isolation for Gazette Notices
  // ===========================================================================
  await runTest('5.3 Cross-Tenant Notices Isolation (INST_001 vs INST_002)', async () => {
    const noticeA = await GazetteNotice.create('INST_001', {
      title: 'College A Annual Convocation 2026',
      category: 'events',
      summary: 'Ceremony details for College A graduates'
    });

    const noticeB = await GazetteNotice.create('INST_002', {
      title: 'College B Annual Convocation 2026',
      category: 'events',
      summary: 'Ceremony details for College B graduates'
    });

    // College A cannot access College B notice
    const crossFetch = await GazetteNotice.get('INST_001', noticeB.noticeId);
    assert.strictEqual(crossFetch, null, 'College A must NEVER see College B notice');

    // Listing for College A must never show College B
    const listA = await GazetteNotice.listByInstitution('INST_001');
    const hasNoticeB = listA.some(n => n.noticeId === noticeB.noticeId);
    assert.strictEqual(hasNoticeB, false, 'College B notice leaked into College A noticeboard!');
  });

  // ===========================================================================
  // 5.4: S3 Secure Document Upload Presigned URL
  // ===========================================================================
  await runTest('5.4 S3 Pre-signed URL Generation & Validation', async () => {
    // Missing fileName
    const badEvent = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileType: 'application/pdf' })
    };
    const badRes = await getUploadUrlHandler(badEvent);
    assert.strictEqual(badRes.statusCode, 400);

    // Valid upload URL generation
    const validEvent = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: '12th_Marksheet_Aarav.pdf',
        fileType: 'application/pdf',
        folder: 'admissions'
      })
    };
    const res = await getUploadUrlHandler(validEvent);
    assert.strictEqual(res.statusCode, 200);

    const data = JSON.parse(res.body).data;
    assert.ok(data.uploadUrl, 'Must return uploadUrl');
    assert.ok(data.s3Key.startsWith('INST_001/admissions/'), 'S3 key must include institutionId namespace');
    assert.ok(data.s3Key.includes('12th_Marksheet_Aarav.pdf'));
  });

  // ===========================================================================
  // 5.5: Multi-Tenant S3 Path Partitioning
  // ===========================================================================
  await runTest('5.5 Multi-Tenant S3 Path Partitioning (INST_001 vs INST_002)', async () => {
    const eventA = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: 'resume.pdf', fileType: 'application/pdf', folder: 'resumes' })
    };
    const resA = await getUploadUrlHandler(eventA);
    const keyA = JSON.parse(resA.body).data.s3Key;

    const eventB = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_002', 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: 'resume.pdf', fileType: 'application/pdf', folder: 'resumes' })
    };
    const resB = await getUploadUrlHandler(eventB);
    const keyB = JSON.parse(resB.body).data.s3Key;

    assert.ok(keyA.startsWith('INST_001/'), 'Tenant A key must start with INST_001');
    assert.ok(keyB.startsWith('INST_002/'), 'Tenant B key must start with INST_002');
    assert.notStrictEqual(keyA, keyB, 'Keys must be in completely separate tenant namespaces');
  });

  // ===========================================================================
  // 5.6: E2E Notices & Uploads Lambda Handlers Execution
  // ===========================================================================
  await runTest('5.6 E2E Notices & Uploads Lambda Handlers', async () => {
    // 1. POST /api/notices
    const postNoticeEvent = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Robotics Hackathon 2026',
        category: 'events',
        summary: '48-hour inter-college hackathon with cash prizes up to 5 Lakhs',
        isUrgentTicker: true
      })
    };
    const noticeRes = await publishNoticeHandler(postNoticeEvent);
    assert.strictEqual(noticeRes.statusCode, 201);
    const createdNotice = JSON.parse(noticeRes.body).data;
    assert.ok(createdNotice.noticeId);

    // 2. GET /api/notices
    const listEvent = {
      httpMethod: 'GET',
      headers: { 'institutionId': 'INST_001' }
    };
    const listRes = await listNoticesHandler(listEvent);
    assert.strictEqual(listRes.statusCode, 200);

    // 3. DELETE /api/notices/{noticeId}
    const deleteEvent = {
      httpMethod: 'DELETE',
      headers: { 'institutionId': 'INST_001' },
      pathParameters: { noticeId: createdNotice.noticeId }
    };
    const deleteRes = await deleteNoticeHandler(deleteEvent);
    assert.strictEqual(deleteRes.statusCode, 200);
  });

  console.log('\n========================================================================');
  console.log(`🎉 PHASE 5 RESULT: ${passed}/${total} TESTS PASSED!`);
  console.log('========================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
};

runAllTests().catch((err) => {
  console.error('Fatal error during Phase 5 verification:', err);
  process.exit(1);
});
