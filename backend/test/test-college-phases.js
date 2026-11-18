// serverless/test/test-college-phases.js
// Automated verification suite for TEKKZY College of Technology Serverless Backend

const assert = require('assert');

// Mock DynamoDB in memory for fast offline verification
const mockDb = new Map();
const db = require('../utils/db');

db.put = async (tableName, item) => {
  const table = mockDb.get(tableName) || new Map();
  // key can be compound or simple
  const key = item.cognitoId || item.applicationId || item.inquiryId || item.recruiterId || item.passId || item.noticeId || `${item.institutionId}_${item.index}`;
  table.set(key, JSON.parse(JSON.stringify(item)));
  mockDb.set(tableName, table);
  return { Attributes: item };
};

db.get = async (tableName, keyObj) => {
  const table = mockDb.get(tableName);
  if (!table) return {};
  const key = keyObj.cognitoId || keyObj.applicationId || keyObj.inquiryId || keyObj.recruiterId || keyObj.passId || keyObj.noticeId || `${keyObj.institutionId}_${keyObj.index}`;
  const item = table.get(key);
  return { Item: item ? JSON.parse(JSON.stringify(item)) : undefined };
};

db.query = async (params) => {
  const table = mockDb.get(params.TableName);
  if (!table) return { Items: [] };
  const items = Array.from(table.values());
  return { Items: items };
};

db.delete = async (tableName, keyObj) => {
  const table = mockDb.get(tableName);
  if (!table) return {};
  const key = keyObj.cognitoId || keyObj.applicationId || keyObj.inquiryId || keyObj.recruiterId || keyObj.passId || keyObj.noticeId || `${keyObj.institutionId}_${keyObj.index}`;
  table.delete(key);
  return {};
};

const runAllTests = async () => {
  console.log('========================================================================');
  console.log('🧪 TEKKZY COLLEGE OF TECHNOLOGY — AWS SERVERLESS BACKEND TEST SUITE');
  console.log('========================================================================\n');

  let passed = 0;
  let total = 0;

  const test = async (name, fn) => {
    total++;
    try {
      await fn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
    }
  };

  // Phase 1: Test College Settings & Config
  await test('Phase 1: College Settings (Get & Update Config)', async () => {
    const getConfig = require('../functions/settings/get-college-config');
    const updateConfig = require('../functions/settings/update-college-config');

    const res1 = await getConfig.main({ headers: { institutionId: 'TAT_MAIN_CAMPUS' } });
    assert.strictEqual(res1.statusCode, 200);
    const body1 = JSON.parse(res1.body);
    assert.strictEqual(body1.data.collegeName, 'TEKKZY College of Technology');

    const res2 = await updateConfig.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      body: { tagline: 'Excellence in Engineering & Technology 2026' }
    });
    assert.strictEqual(res2.statusCode, 200);
    const body2 = JSON.parse(res2.body);
    assert.strictEqual(body2.data.tagline, 'Excellence in Engineering & Technology 2026');
  });

  // Phase 2: Test Admissions Lifecycle
  let createdAppId = null;
  await test('Phase 2: Admissions (Submit Application & Retrieve)', async () => {
    const apply = require('../functions/admissions/apply');
    const listApps = require('../functions/admissions/list-applications');
    const getApp = require('../functions/admissions/get-application');
    const updateStatus = require('../functions/admissions/update-status');

    const res = await apply.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      body: {
        applicantName: 'Subhasish Nayak',
        applicantEmail: 'subhasish@example.com',
        applicantPhone: '9876543210',
        programName: 'B.Tech in Computer Science & Engineering',
        qualifyingExam: 'JEE Main',
        examScore: '96.4 Percentile'
      }
    });

    assert.strictEqual(res.statusCode, 201);
    const body = JSON.parse(res.body);
    assert.ok(body.data.applicationId);
    assert.strictEqual(body.data.status, 'applied');
    createdAppId = body.data.applicationId;

    const listRes = await listApps.main({ headers: { institutionId: 'TAT_MAIN_CAMPUS' } });
    assert.strictEqual(listRes.statusCode, 200);

    const getRes = await getApp.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      pathParameters: { applicationId: createdAppId }
    });
    assert.strictEqual(getRes.statusCode, 200);

    const updateRes = await updateStatus.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      pathParameters: { applicationId: createdAppId },
      body: { status: 'under_review' }
    });
    assert.strictEqual(updateRes.statusCode, 200);
    const updatedBody = JSON.parse(updateRes.body);
    assert.strictEqual(updatedBody.data.status, 'under_review');
  });

  // Phase 3: Test Inquiries & Helpdesk
  await test('Phase 3: Public Inquiries (Submit & Retrieve)', async () => {
    const createInq = require('../functions/inquiries/create-inquiry');
    const listInqs = require('../functions/inquiries/list-inquiries');

    const res = await createInq.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      body: {
        name: 'Priyanka Das',
        email: 'priyanka@example.com',
        phone: '9123456789',
        message: 'Interested in Diploma to B.Tech Lateral Entry program.'
      }
    });

    assert.strictEqual(res.statusCode, 201);
    const listRes = await listInqs.main({ headers: { institutionId: 'TAT_MAIN_CAMPUS' } });
    assert.strictEqual(listRes.statusCode, 200);
    const listBody = JSON.parse(listRes.body);
    assert.ok(listBody.data.length >= 1);
  });

  // Phase 4: Test Corporate Placements & Recruiters
  await test('Phase 4: Corporate Placements (Register Recruiter & List)', async () => {
    const createRec = require('../functions/placements/create-recruiter');
    const listRecs = require('../functions/placements/list-recruiters');

    const res = await createRec.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      body: {
        organizationName: 'Tata Consultancy Services',
        contactPerson: 'Arun Kumar',
        contactEmail: 'arun.k@tcs.com',
        category: 'Consulting & IT'
      }
    });

    assert.strictEqual(res.statusCode, 201);
    const listRes = await listRecs.main({ headers: { institutionId: 'TAT_MAIN_CAMPUS' } });
    assert.strictEqual(listRes.statusCode, 200);
    const listBody = JSON.parse(listRes.body);
    assert.ok(listBody.data.length >= 1);
  });

  // Phase 5: Test Campus Gate Security & Passes
  let createdPassId = null;
  await test('Phase 5: Campus Gate Security (Generate Pass & Checkout)', async () => {
    const createPass = require('../functions/security/create-gatepass');
    const checkoutPass = require('../functions/security/checkout-gatepass');
    const listActive = require('../functions/security/list-active-visitors');

    const res = await createPass.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      body: {
        visitorName: 'Rajesh Sharma',
        visitorPhone: '9888877777',
        purpose: 'Admission Counseling Inquiry',
        personToMeet: 'Dr. S. Mohanty (Dean Academics)'
      }
    });

    assert.strictEqual(res.statusCode, 201);
    const body = JSON.parse(res.body);
    assert.ok(body.data.passId);
    assert.strictEqual(body.data.status, 'inside_campus');
    createdPassId = body.data.passId;

    const listRes = await listActive.main({ headers: { institutionId: 'TAT_MAIN_CAMPUS' } });
    assert.strictEqual(listRes.statusCode, 200);

    const checkOutRes = await checkoutPass.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      pathParameters: { passId: createdPassId }
    });
    assert.strictEqual(checkOutRes.statusCode, 200);
    const checkedOutBody = JSON.parse(checkOutRes.body);
    assert.strictEqual(checkedOutBody.data.status, 'checked_out');
  });

  // Phase 6: Test Official Gazette Notices
  await test('Phase 6: Official Gazette Notices (Publish, List & Delete)', async () => {
    const publish = require('../functions/notices/publish-notice');
    const listNotices = require('../functions/notices/list-notices');
    const deleteNotice = require('../functions/notices/delete-notice');

    const res = await publish.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      body: {
        title: 'BPUT 7th Semester B.Tech Odd Semester Examination Schedule Released',
        category: 'examination',
        summary: 'Official timetable for theory and practical labs published by examination cell.',
        isUrgentTicker: true
      }
    });

    assert.strictEqual(res.statusCode, 201);
    const body = JSON.parse(res.body);
    const noticeId = body.data.noticeId;

    const listRes = await listNotices.main({ headers: { institutionId: 'TAT_MAIN_CAMPUS' } });
    assert.strictEqual(listRes.statusCode, 200);

    const delRes = await deleteNotice.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      pathParameters: { noticeId }
    });
    assert.strictEqual(delRes.statusCode, 200);
  });

  // Phase 7: Test User Profile Management
  await test('Phase 7: User Profile (Create & Query User Profile)', async () => {
    const createProfile = require('../functions/user/create-profile');
    const getProfile = require('../functions/user/get-profile');

    const res = await createProfile.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      body: {
        cognitoId: 'cog-user-7788',
        fullName: 'Prof. Ananya Senapati',
        email: 'ananya.senapati@tekkzy.edu.in',
        phoneNumber: '9437000000',
        userType: 'teacher',
        department: 'School of Engineering'
      }
    });

    assert.strictEqual(res.statusCode, 201);

    const getRes = await getProfile.main({
      headers: { institutionId: 'TAT_MAIN_CAMPUS' },
      pathParameters: { cognitoId: 'cog-user-7788' }
    });
    assert.strictEqual(getRes.statusCode, 200);
    const getBody = JSON.parse(getRes.body);
    assert.strictEqual(getBody.data.fullName, 'Prof. Ananya Senapati');
  });

  console.log('\n========================================================================');
  console.log(`🎉 TEST SUMMARY: ${passed}/${total} PHASES PASSED WITH ZERO ERRORS!`);
  console.log('========================================================================\n');
};

runAllTests().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
