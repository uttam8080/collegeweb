// backend/test/test-phase-3.js
// Dedicated Phase 3 Verification: Public Admissions & Inquiries Microservices

const assert = require('assert');

// In-memory mock DynamoDB for isolated unit testing
const mockDb = new Map();
const db = require('../utils/db');

// Composite key generator: `${institutionId}_${sortKey}`
const getKey = (item) => {
  const sk = item.applicationId || item.inquiryId || item.recruiterId || item.passId || item.noticeId || item.cognitoId || item.index;
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

  if (params.FilterExpression && params.ExpressionAttributeValues[':statusVal']) {
    const statusVal = params.ExpressionAttributeValues[':statusVal'];
    items = items.filter(item => item.status === statusVal);
  }

  return { Items: items };
};

console.log('========================================================================');
console.log('🧪 VERIFYING PHASE 3: PUBLIC ADMISSIONS & INQUIRIES MICROSERVICES');
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
  const AdmissionApplication = require('../models/AdmissionApplication');
  const InquiryLead = require('../models/InquiryLead');

  const applyHandler = require('../functions/admissions/apply').main;
  const getAppHandler = require('../functions/admissions/get-application').main;
  const listAppsHandler = require('../functions/admissions/list-applications').main;
  const updateStatusHandler = require('../functions/admissions/update-status').main;

  const createInquiryHandler = require('../functions/inquiries/create-inquiry').main;
  const listInquiriesHandler = require('../functions/inquiries/list-inquiries').main;
  const updateInquiryHandler = require('../functions/inquiries/update-inquiry').main;

  // ===========================================================================
  // 3.1: Admission Application Creation & Schema Validation
  // ===========================================================================
  await runTest('3.1 Model Validation: Required Fields & Defaults', async () => {
    // Missing required fields
    try {
      await AdmissionApplication.create('INST_001', { applicantName: 'John Doe' });
      assert.fail('Should fail due to missing fields');
    } catch (err) {
      assert.ok(err.message.includes('Validation failed'), 'Expected validation error');
    }

    // Valid creation
    const app = await AdmissionApplication.create('INST_001', {
      applicantName: 'Aarav Sharma',
      applicantEmail: 'aarav.sharma@example.in',
      applicantPhone: '+919876543210',
      programName: 'B.Tech Computer Science & Engineering',
      qualifyingExam: 'JEE Advanced',
      examScore: '98.5 Percentile'
    });

    assert.ok(app.applicationId.startsWith('TAT-APP-'), 'Generated valid TAT-APP ID');
    assert.strictEqual(app.institutionId, 'INST_001');
    assert.strictEqual(app.status, 'applied');
    assert.ok(app.createdAt > 0, 'Timestamp recorded');
  });

  // ===========================================================================
  // 3.2: Application Retrieval & Lifecycle Status Updates
  // ===========================================================================
  await runTest('3.2 Application Retrieval & Status Lifecycle Updates', async () => {
    const created = await AdmissionApplication.create('INST_001', {
      applicantName: 'Diya Patel',
      applicantEmail: 'diya.p@example.com',
      applicantPhone: '+919812345678',
      programName: 'B.Tech AI & Data Science',
      qualifyingExam: 'MHT-CET',
      examScore: '99.2 Percentile'
    });

    // Fetch existing
    const retrieved = await AdmissionApplication.get('INST_001', created.applicationId);
    assert.strictEqual(retrieved.applicantName, 'Diya Patel');
    assert.strictEqual(retrieved.status, 'applied');

    // Update status to shortlisted
    const updated = await AdmissionApplication.update('INST_001', created.applicationId, {
      status: 'shortlisted',
      notes: 'Eligible for Merit Scholarship Category A'
    });

    assert.strictEqual(updated.status, 'shortlisted');
    assert.strictEqual(updated.notes, 'Eligible for Merit Scholarship Category A');
    assert.ok(updated.updatedAt >= updated.createdAt);
  });

  // ===========================================================================
  // 3.3: Strict Cross-Tenant Isolation for Admissions
  // ===========================================================================
  await runTest('3.3 Cross-Tenant Admissions Isolation (INST_001 vs INST_002)', async () => {
    // College A (INST_001) applicant
    const appA = await AdmissionApplication.create('INST_001', {
      applicantName: 'College A Student',
      applicantEmail: 'student.a@college-a.edu',
      applicantPhone: '+919000000001',
      programName: 'Mechanical Engineering',
      qualifyingExam: 'State CET',
      examScore: '85%'
    });

    // College B (INST_002) applicant
    const appB = await AdmissionApplication.create('INST_002', {
      applicantName: 'College B Student',
      applicantEmail: 'student.b@college-b.edu',
      applicantPhone: '+919000000002',
      programName: 'Civil Engineering',
      qualifyingExam: 'State CET',
      examScore: '82%'
    });

    // INST_001 cannot retrieve INST_002's application
    const crossFetch = await AdmissionApplication.get('INST_001', appB.applicationId);
    assert.strictEqual(crossFetch, null, 'College A must NEVER see College B application');

    // INST_002 cannot retrieve INST_001's application
    const crossFetchReverse = await AdmissionApplication.get('INST_002', appA.applicationId);
    assert.strictEqual(crossFetchReverse, null, 'College B must NEVER see College A application');

    // List applications for INST_001 only returns College A applications
    const listA = await AdmissionApplication.listByInstitution('INST_001');
    const hasCollegeB = listA.some(app => app.applicationId === appB.applicationId);
    assert.strictEqual(hasCollegeB, false, 'College B records must NOT appear in College A listing');
  });

  // ===========================================================================
  // 3.4: Inquiries Model Validation & Follow-Up Lifecycle
  // ===========================================================================
  await runTest('3.4 Inquiry Creation, Filtering, & Counselor Updates', async () => {
    // Missing fields
    try {
      await InquiryLead.create('INST_001', { name: 'Parent Inquiry' });
      assert.fail('Should fail due to missing fields');
    } catch (err) {
      assert.ok(err.message.includes('Validation failed'));
    }

    // Valid inquiry
    const inq = await InquiryLead.create('INST_001', {
      name: 'Rohan Mehra',
      email: 'rohan.mehra@gmail.com',
      phone: '+919988776655',
      message: 'Need information about hostel facilities and sports quota'
    });

    assert.ok(inq.inquiryId.startsWith('INQ-'));
    assert.strictEqual(inq.status, 'new');

    // Counselor updates inquiry
    const resolvedInq = await InquiryLead.update('INST_001', inq.inquiryId, {
      status: 'resolved',
      notes: 'Hostel fee brochure sent via WhatsApp & email',
      counselorName: 'Dr. S. Nair'
    });

    assert.strictEqual(resolvedInq.status, 'resolved');
    assert.strictEqual(resolvedInq.counselorName, 'Dr. S. Nair');
  });

  // ===========================================================================
  // 3.5: Strict Cross-Tenant Isolation for Inquiries
  // ===========================================================================
  await runTest('3.5 Cross-Tenant Inquiries Isolation (INST_001 vs INST_002)', async () => {
    const inqA = await InquiryLead.create('INST_001', {
      name: 'Prospect A',
      email: 'prospect.a@mail.com',
      phone: '+919111111111',
      message: 'Inquiry for College A'
    });

    const inqB = await InquiryLead.create('INST_002', {
      name: 'Prospect B',
      email: 'prospect.b@mail.com',
      phone: '+919222222222',
      message: 'Inquiry for College B'
    });

    // College A cannot access College B's inquiry
    const crossFetch = await InquiryLead.get('INST_001', inqB.inquiryId);
    assert.strictEqual(crossFetch, null, 'College A must NEVER see College B inquiry');

    // Listing for College B never shows College A inquiries
    const listB = await InquiryLead.listByInstitution('INST_002');
    const hasInqA = listB.some(item => item.inquiryId === inqA.inquiryId);
    assert.strictEqual(hasInqA, false, 'College A inquiry leaked into College B!');
  });

  // ===========================================================================
  // 3.6: End-to-End API Handlers Execution
  // ===========================================================================
  await runTest('3.6 E2E Admissions & Inquiries Lambda Handlers', async () => {
    // 1. POST /api/admissions/apply
    const postApplyEvent = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        applicantName: 'Vikram Joshi',
        applicantEmail: 'vikram.joshi@example.com',
        applicantPhone: '+919333333333',
        programName: 'B.Tech Electrical & Electronics Engineering',
        qualifyingExam: 'GATE / JEE',
        examScore: '96.8%'
      })
    };
    const applyRes = await applyHandler(postApplyEvent);
    assert.strictEqual(applyRes.statusCode, 201);
    const applyBody = JSON.parse(applyRes.body);
    const createdAppId = applyBody.data.applicationId;
    assert.ok(createdAppId);

    // 2. GET /api/admissions/{applicationId}
    const getAppEvent = {
      httpMethod: 'GET',
      headers: { 'institutionId': 'INST_001' },
      pathParameters: { applicationId: createdAppId }
    };
    const getRes = await getAppHandler(getAppEvent);
    assert.strictEqual(getRes.statusCode, 200);

    // 3. PUT /api/admissions/{applicationId}/status
    const updateEvent = {
      httpMethod: 'PUT',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      pathParameters: { applicationId: createdAppId },
      body: JSON.stringify({ status: 'offer_issued', notes: 'Offer letter dispatched' })
    };
    const updateRes = await updateStatusHandler(updateEvent);
    assert.strictEqual(updateRes.statusCode, 200);
    const updateBody = JSON.parse(updateRes.body);
    assert.strictEqual(updateBody.data.status, 'offer_issued');

    // 4. POST /api/inquiries
    const postInqEvent = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Pooja Hegde',
        email: 'pooja.h@example.com',
        phone: '+919444444444',
        message: 'Inquiring about robotics lab and AI specialization'
      })
    };
    const inqRes = await createInquiryHandler(postInqEvent);
    assert.strictEqual(inqRes.statusCode, 201);
    const inqBody = JSON.parse(inqRes.body);
    const createdInqId = inqBody.data.inquiryId;

    // 5. GET /api/inquiries
    const listInqEvent = {
      httpMethod: 'GET',
      headers: { 'institutionId': 'INST_001' }
    };
    const listRes = await listInquiriesHandler(listInqEvent);
    assert.strictEqual(listRes.statusCode, 200);

    // 6. PUT /api/inquiries/{inquiryId}
    const updateInqEvent = {
      httpMethod: 'PUT',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      pathParameters: { inquiryId: createdInqId },
      body: JSON.stringify({ status: 'contacted', notes: 'Called candidate. Sent prospectus.' })
    };
    const updateInqRes = await updateInquiryHandler(updateInqEvent);
    assert.strictEqual(updateInqRes.statusCode, 200);
  });

  console.log('\n========================================================================');
  console.log(`🎉 PHASE 3 RESULT: ${passed}/${total} TESTS PASSED!`);
  console.log('========================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
};

runAllTests().catch((err) => {
  console.error('Fatal error during Phase 3 verification:', err);
  process.exit(1);
});
