// backend/test/test-phase-4.js
// Dedicated Phase 4 Verification: Corporate Placements & Campus Security Microservices

const assert = require('assert');

// In-memory mock DynamoDB for isolated unit testing
const mockDb = new Map();
const db = require('../utils/db');

// Composite key generator: `${institutionId}#${sortKey}`
const getKey = (item) => {
  const sk = item.recruiterId || item.passId || item.applicationId || item.inquiryId || item.noticeId || item.cognitoId || item.index;
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

db.query = async (params) => {
  const table = mockDb.get(params.TableName);
  if (!table) return { Items: [] };

  const instId = params.ExpressionAttributeValues[':inst'];
  let items = Array.from(table.values()).filter(item => item.institutionId === instId);

  // Handle status / driveStatus filters
  if (params.FilterExpression) {
    if (params.ExpressionAttributeValues[':statusVal']) {
      const statusVal = params.ExpressionAttributeValues[':statusVal'];
      items = items.filter(item => item.status === statusVal);
    }
    if (params.ExpressionAttributeValues[':dStatus']) {
      const dStatusVal = params.ExpressionAttributeValues[':dStatus'];
      items = items.filter(item => item.driveStatus === dStatusVal);
    }
  }

  return { Items: items };
};

console.log('========================================================================');
console.log('🧪 VERIFYING PHASE 4: CORPORATE PLACEMENTS & CAMPUS SECURITY MICROSERVICES');
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
  const PlacementRecruiter = require('../models/PlacementRecruiter');
  const SecurityGatePass = require('../models/SecurityGatePass');

  const createRecruiterHandler = require('../functions/placements/create-recruiter').main;
  const listRecruitersHandler = require('../functions/placements/list-recruiters').main;
  const updateRecruiterHandler = require('../functions/placements/update-recruiter').main;

  const createGatepassHandler = require('../functions/security/create-gatepass').main;
  const checkoutGatepassHandler = require('../functions/security/checkout-gatepass').main;
  const listActiveVisitorsHandler = require('../functions/security/list-active-visitors').main;

  // ===========================================================================
  // 4.1: Placement Recruiter Model & Validation
  // ===========================================================================
  await runTest('4.1 Recruiter Model Validation: Required Fields & Defaults', async () => {
    // Missing required fields
    try {
      await PlacementRecruiter.create('INST_001', { organizationName: 'Tech Mahindra' });
      assert.fail('Should fail due to missing fields');
    } catch (err) {
      assert.ok(err.message.includes('Validation failed'));
    }

    // Valid creation
    const rec = await PlacementRecruiter.create('INST_001', {
      organizationName: 'Google India',
      contactPerson: 'Aditi Rao (University Relations)',
      contactEmail: 'aditi.rao@google.com',
      website: 'https://careers.google.com'
    });

    assert.ok(rec.recruiterId.startsWith('REC-'));
    assert.strictEqual(rec.institutionId, 'INST_001');
    assert.strictEqual(rec.driveStatus, 'inquiry');
    assert.strictEqual(rec.totalOffers, 0);
    assert.ok(rec.createdAt > 0);
  });

  // ===========================================================================
  // 4.2: Recruiter Drive Updates & Lifecycle
  // ===========================================================================
  await runTest('4.2 Recruiter Drive Updates & Offers Tracking', async () => {
    const rec = await PlacementRecruiter.create('INST_001', {
      organizationName: 'Microsoft R&D',
      contactPerson: 'Karan Sen',
      contactEmail: 'karan.sen@microsoft.com'
    });

    // Update drive status, package CTC, and roles
    const updated = await PlacementRecruiter.update('INST_001', rec.recruiterId, {
      driveStatus: 'confirmed',
      packageCtc: '44.5 LPA',
      jobRoles: ['Software Engineer - Cloud & AI', 'Systems Engineer'],
      driveDate: '2026-11-28',
      totalOffers: 14
    });

    assert.strictEqual(updated.driveStatus, 'confirmed');
    assert.strictEqual(updated.packageCtc, '44.5 LPA');
    assert.strictEqual(updated.totalOffers, 14);
    assert.strictEqual(updated.jobRoles.length, 2);
  });

  // ===========================================================================
  // 4.3: Strict Cross-Tenant Isolation for Placements
  // ===========================================================================
  await runTest('4.3 Cross-Tenant Placements Isolation (INST_001 vs INST_002)', async () => {
    // College A recruiter
    const recA = await PlacementRecruiter.create('INST_001', {
      organizationName: 'College A Partner Company',
      contactPerson: 'Lead A',
      contactEmail: 'partner@college-a-corp.com'
    });

    // College B recruiter
    const recB = await PlacementRecruiter.create('INST_002', {
      organizationName: 'College B Partner Company',
      contactPerson: 'Lead B',
      contactEmail: 'partner@college-b-corp.com'
    });

    // College A cannot access College B recruiter
    const crossFetch = await PlacementRecruiter.get('INST_001', recB.recruiterId);
    assert.strictEqual(crossFetch, null, 'College A must NEVER see College B recruiter');

    // College B cannot access College A recruiter
    const crossFetchReverse = await PlacementRecruiter.get('INST_002', recA.recruiterId);
    assert.strictEqual(crossFetchReverse, null, 'College B must NEVER see College A recruiter');

    // Listing for College A must NOT include College B
    const listA = await PlacementRecruiter.listByInstitution('INST_001');
    const hasRecB = listA.some(r => r.recruiterId === recB.recruiterId);
    assert.strictEqual(hasRecB, false, 'College B recruiter leaked into College A!');
  });

  // ===========================================================================
  // 4.4: Campus Security Gate Pass Model & Checkout Lifecycle
  // ===========================================================================
  await runTest('4.4 Gate Pass Validation, Active List, & Checkout Lifecycle', async () => {
    // Missing fields
    try {
      await SecurityGatePass.create('INST_001', { visitorName: 'Suresh Kumar' });
      assert.fail('Should fail due to missing fields');
    } catch (err) {
      assert.ok(err.message.includes('Validation failed'));
    }

    // Create gate pass (visitor enters campus)
    const pass = await SecurityGatePass.create('INST_001', {
      visitorName: 'Suresh Kumar',
      visitorPhone: '+919876500000',
      purpose: 'Guest Lecture on Quantum Computing',
      personToMeet: 'HOD Computer Science'
    });

    assert.ok(pass.passId.startsWith('SEC-PASS-'));
    assert.strictEqual(pass.status, 'inside_campus');
    assert.ok(pass.checkInTime > 0);

    // Verify appears in active visitors
    const activeVisitorsBefore = await SecurityGatePass.listActiveVisitors('INST_001');
    const isInside = activeVisitorsBefore.some(v => v.passId === pass.passId);
    assert.strictEqual(isInside, true, 'Visitor should be listed as inside campus');

    // Visitor checks out at the gate
    const checkedOut = await SecurityGatePass.checkout('INST_001', pass.passId);
    assert.strictEqual(checkedOut.status, 'checked_out');
    assert.ok(checkedOut.checkOutTime >= checkedOut.checkInTime);

    // Verify no longer in active visitors
    const activeVisitorsAfter = await SecurityGatePass.listActiveVisitors('INST_001');
    const isStillInside = activeVisitorsAfter.some(v => v.passId === pass.passId);
    assert.strictEqual(isStillInside, false, 'Checked-out visitor should no longer be listed in active visitors');
  });

  // ===========================================================================
  // 4.5: Strict Cross-Tenant Isolation for Campus Security
  // ===========================================================================
  await runTest('4.5 Cross-Tenant Security Gate Pass Isolation (INST_001 vs INST_002)', async () => {
    const passA = await SecurityGatePass.create('INST_001', {
      visitorName: 'Visitor for Campus A',
      visitorPhone: '+919111111111',
      purpose: 'Equipment Delivery',
      personToMeet: 'Lab Assistant'
    });

    const passB = await SecurityGatePass.create('INST_002', {
      visitorName: 'Visitor for Campus B',
      visitorPhone: '+919222222222',
      purpose: 'Inspection',
      personToMeet: 'Dean'
    });

    // College A cannot checkout College B's visitor
    const crossCheckout = await SecurityGatePass.checkout('INST_001', passB.passId);
    assert.strictEqual(crossCheckout, null, 'Campus A cannot checkout Campus B visitor');

    // Active visitors list for Campus A never leaks Campus B visitors
    const activeA = await SecurityGatePass.listActiveVisitors('INST_001');
    const hasVisitorB = activeA.some(v => v.passId === passB.passId);
    assert.strictEqual(hasVisitorB, false, 'Campus B visitor leaked into Campus A active list!');
  });

  // ===========================================================================
  // 4.6: End-to-End Placements & Security Lambda Handlers Execution
  // ===========================================================================
  await runTest('4.6 E2E Placements & Campus Security Lambda Handlers', async () => {
    // 1. POST /api/placements/recruiters
    const postRecEvent = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        organizationName: 'Amazon Development Centre',
        contactPerson: 'Vikram Seth',
        contactEmail: 'vikram.s@amazon.com'
      })
    };
    const recRes = await createRecruiterHandler(postRecEvent);
    assert.strictEqual(recRes.statusCode, 201);
    const recBody = JSON.parse(recRes.body);
    const createdRecId = recBody.data.recruiterId;

    // 2. GET /api/placements/recruiters
    const listRecEvent = {
      httpMethod: 'GET',
      headers: { 'institutionId': 'INST_001' }
    };
    const listRecRes = await listRecruitersHandler(listRecEvent);
    assert.strictEqual(listRecRes.statusCode, 200);

    // 3. PUT /api/placements/recruiters/{recruiterId}
    const updateRecEvent = {
      httpMethod: 'PUT',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      pathParameters: { recruiterId: createdRecId },
      body: JSON.stringify({ driveStatus: 'confirmed', packageCtc: '38.0 LPA' })
    };
    const updateRecRes = await updateRecruiterHandler(updateRecEvent);
    assert.strictEqual(updateRecRes.statusCode, 200);

    // 4. POST /api/security/gatepass
    const postPassEvent = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorName: 'Rajesh Khanna',
        visitorPhone: '+919555555555',
        purpose: 'Academic Board Meeting',
        personToMeet: 'Principal Office'
      })
    };
    const passRes = await createGatepassHandler(postPassEvent);
    assert.strictEqual(passRes.statusCode, 201);
    const passBody = JSON.parse(passRes.body);
    const createdPassId = passBody.data.passId;

    // 5. GET /api/security/active-visitors
    const listVisitorsEvent = {
      httpMethod: 'GET',
      headers: { 'institutionId': 'INST_001' }
    };
    const listVisitorsRes = await listActiveVisitorsHandler(listVisitorsEvent);
    assert.strictEqual(listVisitorsRes.statusCode, 200);

    // 6. PUT /api/security/gatepass/{passId}/checkout
    const checkoutEvent = {
      httpMethod: 'PUT',
      headers: { 'institutionId': 'INST_001' },
      pathParameters: { passId: createdPassId }
    };
    const checkoutRes = await checkoutGatepassHandler(checkoutEvent);
    assert.strictEqual(checkoutRes.statusCode, 200);
    const checkoutBody = JSON.parse(checkoutRes.body);
    assert.strictEqual(checkoutBody.data.status, 'checked_out');
  });

  console.log('\n========================================================================');
  console.log(`🎉 PHASE 4 RESULT: ${passed}/${total} TESTS PASSED!`);
  console.log('========================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
};

runAllTests().catch((err) => {
  console.error('Fatal error during Phase 4 verification:', err);
  process.exit(1);
});
