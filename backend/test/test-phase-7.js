// backend/test/test-phase-7.js
// Dedicated Phase 7: End-to-End Multi-Tenant Cross-Service Integration & Regression Suite

const assert = require('assert');

// In-memory mock DynamoDB for isolated multi-service verification
const mockDb = new Map();
const db = require('../utils/db');

const getKey = (item) => {
  const sk = item.cognitoId || item.applicationId || item.inquiryId || item.recruiterId || item.passId || item.noticeId || item.index;
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

  if (params.FilterExpression) {
    if (params.ExpressionAttributeValues[':statusVal']) {
      items = items.filter(item => item.status === params.ExpressionAttributeValues[':statusVal']);
    }
    if (params.ExpressionAttributeValues[':uType']) {
      items = items.filter(item => item.userType === params.ExpressionAttributeValues[':uType']);
    }
    if (params.ExpressionAttributeValues[':cat']) {
      items = items.filter(item => item.category === params.ExpressionAttributeValues[':cat']);
    }
    if (params.ExpressionAttributeValues[':dStatus']) {
      items = items.filter(item => item.driveStatus === params.ExpressionAttributeValues[':dStatus']);
    }
  }

  return { Items: items };
};

console.log('========================================================================');
console.log('🧪 VERIFYING PHASE 7: E2E MULTI-TENANT CROSS-SERVICE INTEGRATION SUITE');
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
  const CollegeConfig = require('../models/CollegeConfig');
  const UserProfile = require('../models/UserProfile');
  const AdmissionApplication = require('../models/AdmissionApplication');
  const InquiryLead = require('../models/InquiryLead');
  const PlacementRecruiter = require('../models/PlacementRecruiter');
  const SecurityGatePass = require('../models/SecurityGatePass');
  const GazetteNotice = require('../models/GazetteNotice');
  const s3 = require('../utils/s3');

  const COLLEGE_A = 'INST_TEKKZY_PUNE';
  const COLLEGE_B = 'INST_TEKKZY_BLR';

  // State trackers
  let appAId, appBId;
  let inqAId, inqBId;
  let recAId, recBId;
  let passAId, passBId;
  let notAId, notBId;

  // ===========================================================================
  // Step 1: College Configuration Setup (Parallel Colleges)
  // ===========================================================================
  await runTest('7.1 Parallel College Configuration (Pune vs Bangalore)', async () => {
    const configA = await CollegeConfig.updateCollegeProfile(COLLEGE_A, {
      collegeName: 'TEKKZY College of Technology - Pune Campus',
      accreditation: 'NAAC A++ Grade, Autonomous',
      contactEmail: 'admissions.pune@tekkzy.edu.in',
      currentSession: '2026-27'
    });

    const configB = await CollegeConfig.updateCollegeProfile(COLLEGE_B, {
      collegeName: 'TEKKZY Institute of Technology - Bangalore Campus',
      accreditation: 'VTU Affiliated, NBA Accredited',
      contactEmail: 'admissions.blr@tekkzy.edu.in',
      currentSession: '2026-27'
    });

    const readA = await CollegeConfig.getCollegeProfile(COLLEGE_A);
    const readB = await CollegeConfig.getCollegeProfile(COLLEGE_B);

    assert.strictEqual(readA.collegeName, 'TEKKZY College of Technology - Pune Campus');
    assert.strictEqual(readB.collegeName, 'TEKKZY Institute of Technology - Bangalore Campus');
    assert.strictEqual(readA.contactEmail, 'admissions.pune@tekkzy.edu.in');
    assert.strictEqual(readB.contactEmail, 'admissions.blr@tekkzy.edu.in');
  });

  // ===========================================================================
  // Step 2: Faculty & Student Onboarding (RBAC)
  // ===========================================================================
  await runTest('7.2 Faculty & Student Multi-Tenant Directory Onboarding', async () => {
    // College A Dean & Student
    await UserProfile.create(COLLEGE_A, {
      cognitoId: 'cog-dean-pune',
      fullName: 'Dr. Anand Kulkarni',
      userType: 'teacher',
      designation: 'Dean of Faculty',
      phoneNumber: '+919820000001',
      department: 'Computer Science'
    });
    await UserProfile.create(COLLEGE_A, {
      cognitoId: 'cog-stud-pune',
      fullName: 'Rahul Deshmukh',
      userType: 'student',
      phoneNumber: '+919820000002',
      department: 'AI & Data Science'
    });

    // College B Dean & Student
    await UserProfile.create(COLLEGE_B, {
      cognitoId: 'cog-dean-blr',
      fullName: 'Dr. Meenakshi Sundaram',
      userType: 'teacher',
      designation: 'Principal & Director',
      phoneNumber: '+919840000001',
      department: 'Aerospace'
    });
    await UserProfile.create(COLLEGE_B, {
      cognitoId: 'cog-stud-blr',
      fullName: 'Kavya Raman',
      userType: 'student',
      phoneNumber: '+919840000002',
      department: 'Cybersecurity'
    });

    // Directory count check
    const listPune = await UserProfile.listByInstitution(COLLEGE_A);
    const listBlr = await UserProfile.listByInstitution(COLLEGE_B);

    assert.strictEqual(listPune.length, 2);
    assert.strictEqual(listBlr.length, 2);
    assert.strictEqual(listPune.some(u => u.cognitoId === 'cog-dean-blr'), false);
    assert.strictEqual(listBlr.some(u => u.cognitoId === 'cog-dean-pune'), false);
  });

  // ===========================================================================
  // Step 3: Admissions Application Lifecycle
  // ===========================================================================
  await runTest('7.3 Public Admissions Application Lifecycle & Review', async () => {
    // Pune application
    const appA = await AdmissionApplication.create(COLLEGE_A, {
      applicantName: 'Tanvi Shinde',
      applicantEmail: 'tanvi.s@gmail.com',
      applicantPhone: '+919700000001',
      programName: 'B.Tech AI & Data Science',
      qualifyingExam: 'MHT-CET',
      examScore: '99.4 Percentile'
    });
    appAId = appA.applicationId;

    // Bangalore application
    const appB = await AdmissionApplication.create(COLLEGE_B, {
      applicantName: 'Naveen Kumar',
      applicantEmail: 'naveen.k@gmail.com',
      applicantPhone: '+919700000002',
      programName: 'B.Tech Aerospace Engineering',
      qualifyingExam: 'KCET',
      examScore: 'Rank 412'
    });
    appBId = appB.applicationId;

    // Admissions office issues offer for Tanvi in Pune
    const updatedA = await AdmissionApplication.update(COLLEGE_A, appAId, {
      status: 'offer_issued',
      scholarship: '50% Tuition Waiver'
    });
    assert.strictEqual(updatedA.status, 'offer_issued');

    // Cross-institution verification
    const crossFetch = await AdmissionApplication.get(COLLEGE_B, appAId);
    assert.strictEqual(crossFetch, null, 'Bangalore office must NOT see Pune application');
  });

  // ===========================================================================
  // Step 4: Helpdesk Inquiries & Counselor Resolution
  // ===========================================================================
  await runTest('7.4 Inquiries & Counselor Resolution Workflow', async () => {
    const inqA = await InquiryLead.create(COLLEGE_A, {
      name: 'Ashok Shinde (Parent)',
      email: 'ashok.shinde@corp.in',
      phone: '+919600000001',
      message: 'Inquiring regarding hostel accommodation and security'
    });
    inqAId = inqA.inquiryId;

    const inqB = await InquiryLead.create(COLLEGE_B, {
      name: 'Priya Narayanan',
      email: 'priya.n@corp.in',
      phone: '+919600000002',
      message: 'Inquiring about aerospace wind tunnel lab facilities'
    });
    inqBId = inqB.inquiryId;

    // Counselor in Pune resolves inquiry
    const resolvedA = await InquiryLead.update(COLLEGE_A, inqAId, {
      status: 'resolved',
      notes: 'Hostel video walkthrough sent to parent',
      counselorName: 'Dr. Anand Kulkarni'
    });
    assert.strictEqual(resolvedA.status, 'resolved');

    // Bangalore listing does not show Pune inquiry
    const blrInquiries = await InquiryLead.listByInstitution(COLLEGE_B);
    assert.strictEqual(blrInquiries.some(i => i.inquiryId === inqAId), false);
  });

  // ===========================================================================
  // Step 5: Corporate Placement Drives
  // ===========================================================================
  await runTest('7.5 Corporate Placement Drives & Salary Package Audits', async () => {
    const recA = await PlacementRecruiter.create(COLLEGE_A, {
      organizationName: 'NVIDIA Graphics India',
      contactPerson: 'Sanjay Dutt (Campus Talent)',
      contactEmail: 'sdutt@nvidia.com'
    });
    recAId = recA.recruiterId;

    const recB = await PlacementRecruiter.create(COLLEGE_B, {
      organizationName: 'ISRO Telemetry & Aerospace Ltd',
      contactPerson: 'K. Radhakrishnan',
      contactEmail: 'campus@isro.gov.in'
    });
    recBId = recB.recruiterId;

    await PlacementRecruiter.update(COLLEGE_A, recAId, {
      driveStatus: 'confirmed',
      packageCtc: '52.0 LPA',
      totalOffers: 8
    });

    await PlacementRecruiter.update(COLLEGE_B, recBId, {
      driveStatus: 'confirmed',
      packageCtc: '28.5 LPA',
      totalOffers: 15
    });

    const puneDrives = await PlacementRecruiter.listByInstitution(COLLEGE_A);
    const blrDrives = await PlacementRecruiter.listByInstitution(COLLEGE_B);

    assert.strictEqual(puneDrives.length, 1);
    assert.strictEqual(puneDrives[0].organizationName, 'NVIDIA Graphics India');
    assert.strictEqual(blrDrives.length, 1);
    assert.strictEqual(blrDrives[0].organizationName, 'ISRO Telemetry & Aerospace Ltd');
  });

  // ===========================================================================
  // Step 6: Campus Security Gate Passes & Checkout
  // ===========================================================================
  await runTest('7.6 Campus Security Entry & Checkout Tracking', async () => {
    const passA = await SecurityGatePass.create(COLLEGE_A, {
      visitorName: 'Sanjay Dutt (NVIDIA Recruiter)',
      visitorPhone: '+919500000001',
      purpose: 'Placement Presentation',
      personToMeet: 'Placement Cell'
    });
    passAId = passA.passId;

    const passB = await SecurityGatePass.create(COLLEGE_B, {
      visitorName: 'AICTE Accreditation Inspector',
      visitorPhone: '+919500000002',
      purpose: 'Annual Quality Audit',
      personToMeet: 'Principal Office'
    });
    passBId = passB.passId;

    // Active visitors in Pune
    const activePune = await SecurityGatePass.listActiveVisitors(COLLEGE_A);
    assert.strictEqual(activePune.length, 1);
    assert.strictEqual(activePune[0].visitorName, 'Sanjay Dutt (NVIDIA Recruiter)');

    // Visitor checkout in Pune
    const checkedOutA = await SecurityGatePass.checkout(COLLEGE_A, passAId);
    assert.strictEqual(checkedOutA.status, 'checked_out');

    // Pune active visitors now empty
    const activePuneAfter = await SecurityGatePass.listActiveVisitors(COLLEGE_A);
    assert.strictEqual(activePuneAfter.length, 0);

    // Bangalore visitor is still inside Bangalore campus
    const activeBlr = await SecurityGatePass.listActiveVisitors(COLLEGE_B);
    assert.strictEqual(activeBlr.length, 1);
    assert.strictEqual(activeBlr[0].status, 'inside_campus');
  });

  // ===========================================================================
  // Step 7: Official Gazette Notices & Ticker
  // ===========================================================================
  await runTest('7.7 Official Gazette Notices & Live Ticker Broadcast', async () => {
    const notA = await GazetteNotice.create(COLLEGE_A, {
      title: 'Winter Carnival & AI Hackathon Announced',
      category: 'events',
      summary: 'Annual cultural & technical symposium starting Dec 10',
      isUrgentTicker: true
    });
    notAId = notA.noticeId;

    const notB = await GazetteNotice.create(COLLEGE_B, {
      title: 'Satellite Launch Seminar Series',
      category: 'academics',
      summary: 'Guest lectures by aerospace scientists',
      isUrgentTicker: false
    });
    notBId = notB.noticeId;

    const puneNotices = await GazetteNotice.listByInstitution(COLLEGE_A);
    const blrNotices = await GazetteNotice.listByInstitution(COLLEGE_B);

    assert.strictEqual(puneNotices.length, 1);
    assert.strictEqual(puneNotices[0].isUrgentTicker, true);
    assert.strictEqual(blrNotices.length, 1);
    assert.strictEqual(blrNotices[0].isUrgentTicker, false);
  });

  // ===========================================================================
  // Step 8: Multi-Tenant S3 Partitioning
  // ===========================================================================
  await runTest('7.8 Multi-Tenant S3 Document Upload Namespaces', async () => {
    const uploadPune = await s3.getUploadUrl(`${COLLEGE_A}/documents/exam_timetable.pdf`, 'application/pdf');
    const uploadBlr = await s3.getUploadUrl(`${COLLEGE_B}/documents/exam_timetable.pdf`, 'application/pdf');

    assert.ok(uploadPune.s3Key.startsWith(`${COLLEGE_A}/`));
    assert.ok(uploadBlr.s3Key.startsWith(`${COLLEGE_B}/`));
    assert.notStrictEqual(uploadPune.s3Key, uploadBlr.s3Key);
  });

  // ===========================================================================
  // Step 9: Zero Cross-Tenant Leakage Comprehensive Audit
  // ===========================================================================
  await runTest('7.9 Zero Cross-Tenant Data Leakage Comprehensive Audit', async () => {
    // 1. Cross-college read attempts must ALL return null
    assert.strictEqual(await AdmissionApplication.get(COLLEGE_A, appBId), null);
    assert.strictEqual(await AdmissionApplication.get(COLLEGE_B, appAId), null);

    assert.strictEqual(await InquiryLead.get(COLLEGE_A, inqBId), null);
    assert.strictEqual(await InquiryLead.get(COLLEGE_B, inqAId), null);

    assert.strictEqual(await PlacementRecruiter.get(COLLEGE_A, recBId), null);
    assert.strictEqual(await PlacementRecruiter.get(COLLEGE_B, recAId), null);

    assert.strictEqual(await SecurityGatePass.get(COLLEGE_A, passBId), null);
    assert.strictEqual(await SecurityGatePass.get(COLLEGE_B, passAId), null);

    assert.strictEqual(await GazetteNotice.get(COLLEGE_A, notBId), null);
    assert.strictEqual(await GazetteNotice.get(COLLEGE_B, notAId), null);

    // 2. Cross-college update attempts must fail gracefully (return null)
    assert.strictEqual(await AdmissionApplication.update(COLLEGE_A, appBId, { status: 'rejected' }), null);
    assert.strictEqual(await InquiryLead.update(COLLEGE_A, inqBId, { status: 'closed' }), null);
    assert.strictEqual(await PlacementRecruiter.update(COLLEGE_A, recBId, { driveStatus: 'cancelled' }), null);
    assert.strictEqual(await SecurityGatePass.checkout(COLLEGE_A, passBId), null);
  });

  console.log('\n========================================================================');
  console.log(`🎉 PHASE 7 RESULT: ${passed}/${total} TESTS PASSED!`);
  console.log('========================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
};

runAllTests().catch((err) => {
  console.error('Fatal error during Phase 7 verification:', err);
  process.exit(1);
});
