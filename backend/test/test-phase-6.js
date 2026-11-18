// backend/test/test-phase-6.js
// Dedicated Phase 6 Verification: Multi-Tenant RBAC User Directory & Cognito Integration

const assert = require('assert');

// In-memory mock DynamoDB for isolated unit testing
const mockDb = new Map();
const db = require('../utils/db');

// Composite key generator: `${institutionId}#${sortKey}`
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

  if (params.FilterExpression && params.ExpressionAttributeValues[':uType']) {
    const uTypeVal = params.ExpressionAttributeValues[':uType'];
    items = items.filter(item => item.userType === uTypeVal);
  }

  return { Items: items };
};

console.log('========================================================================');
console.log('🧪 VERIFYING PHASE 6: MULTI-TENANT RBAC USER DIRECTORY & COGNITO');
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
  const UserProfile = require('../models/UserProfile');
  const { getAuthUser, getInstitutionId } = require('../utils/middleware');

  const createProfileHandler = require('../functions/user/create-profile').main;
  const getProfileHandler = require('../functions/user/get-profile').main;
  const listProfilesHandler = require('../functions/user/list-profiles').main;
  const updateProfileHandler = require('../functions/user/update-profile').main;

  // Helper to create mock JWT
  const makeJwt = (claims) => {
    const payload = Buffer.from(JSON.stringify(claims)).toString('base64');
    return `header.${payload}.signature`;
  };

  // ===========================================================================
  // 6.1: User Profile Model Validation & Role Constraints
  // ===========================================================================
  await runTest('6.1 User Profile Validation: Allowed Roles & Required Fields', async () => {
    // Invalid role
    try {
      await UserProfile.create('INST_001', {
        cognitoId: 'cog-101',
        fullName: 'Jane Doe',
        userType: 'super_admin_unauthorized',
        phoneNumber: '+919876543210'
      });
      assert.fail('Should fail due to invalid role');
    } catch (err) {
      assert.ok(err.message.includes('Validation failed'));
    }

    // Valid role: teacher
    const teacher = await UserProfile.create('INST_001', {
      cognitoId: 'cog-teacher-01',
      fullName: 'Dr. Ramesh Chandra',
      userType: 'teacher',
      phoneNumber: '+919876543210',
      email: 'r.chandra@tekkzy.edu.in',
      department: 'Computer Science',
      designation: 'Professor & Dean of Academics'
    });

    assert.strictEqual(teacher.institutionId, 'INST_001');
    assert.strictEqual(teacher.userType, 'teacher');
    assert.strictEqual(teacher.status, 'active');
  });

  // ===========================================================================
  // 6.2: User Profile Updates & Status Lifecycle
  // ===========================================================================
  await runTest('6.2 User Profile Updates & Status Lifecycle', async () => {
    const student = await UserProfile.create('INST_001', {
      cognitoId: 'cog-student-01',
      fullName: 'Ananya Verma',
      userType: 'student',
      phoneNumber: '+919123456789',
      department: 'Robotics Engineering'
    });

    // Update profile
    const updated = await UserProfile.update('INST_001', student.cognitoId, {
      designation: 'Student Council President',
      phoneNumber: '+919999988888',
      status: 'active'
    });

    assert.strictEqual(updated.designation, 'Student Council President');
    assert.strictEqual(updated.phoneNumber, '+919999988888');
  });

  // ===========================================================================
  // 6.3: Strict Cross-Tenant User Isolation
  // ===========================================================================
  await runTest('6.3 Cross-Tenant User Profile Isolation (INST_001 vs INST_002)', async () => {
    // College A staff
    const userA = await UserProfile.create('INST_001', {
      cognitoId: 'cog-user-college-a',
      fullName: 'College A Registrar',
      userType: 'admin',
      phoneNumber: '+919000000001'
    });

    // College B staff
    const userB = await UserProfile.create('INST_002', {
      cognitoId: 'cog-user-college-b',
      fullName: 'College B Registrar',
      userType: 'admin',
      phoneNumber: '+919000000002'
    });

    // College A cannot retrieve College B user profile
    const crossFetch = await UserProfile.get('INST_001', userB.cognitoId);
    assert.strictEqual(crossFetch, null, 'College A must NEVER see College B user');

    // College B cannot retrieve College A user profile
    const crossFetchReverse = await UserProfile.get('INST_002', userA.cognitoId);
    assert.strictEqual(crossFetchReverse, null, 'College B must NEVER see College A user');

    // Listing for College A must never include College B users
    const listA = await UserProfile.listByInstitution('INST_001');
    const hasUserB = listA.some(u => u.cognitoId === userB.cognitoId);
    assert.strictEqual(hasUserB, false, 'College B user leaked into College A directory!');
  });

  // ===========================================================================
  // 6.4: Role-Based Filtering
  // ===========================================================================
  await runTest('6.4 Role-Based Directory Filtering (Teachers vs Students)', async () => {
    await UserProfile.create('INST_001', {
      cognitoId: 'cog-prof-02',
      fullName: 'Prof. Sneha Kulkarni',
      userType: 'teacher',
      phoneNumber: '+919111122222'
    });

    await UserProfile.create('INST_001', {
      cognitoId: 'cog-stud-02',
      fullName: 'Aditya Roy',
      userType: 'student',
      phoneNumber: '+919333344444'
    });

    const teachers = await UserProfile.listByInstitution('INST_001', { userType: 'teacher' });
    const students = await UserProfile.listByInstitution('INST_001', { userType: 'student' });

    assert.ok(teachers.length >= 2, 'Should list teachers');
    assert.ok(teachers.every(u => u.userType === 'teacher'), 'Every item in teachers list must be a teacher');
    assert.ok(students.length >= 2, 'Should list students');
    assert.ok(students.every(u => u.userType === 'student'), 'Every item in students list must be a student');
  });

  // ===========================================================================
  // 6.5: Cognito JWT Role & Tenant Context Extraction
  // ===========================================================================
  await runTest('6.5 Cognito JWT Claims & Multi-Tenancy Token Security', async () => {
    const adminToken = makeJwt({
      sub: 'cog-admin-jwt-99',
      email: 'principal@tekkzy.edu.in',
      'custom:institutionId': 'INST_TEKKZY_MAIN',
      'custom:userType': 'admin'
    });

    const event = {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    };

    const instId = getInstitutionId(event);
    assert.strictEqual(instId, 'INST_TEKKZY_MAIN', 'InstitutionId extracted strictly from verified JWT claim');

    const authUser = getAuthUser(event);
    assert.strictEqual(authUser.cognitoId, 'cog-admin-jwt-99');
    assert.strictEqual(authUser.userType, 'admin');
    assert.strictEqual(authUser.institutionId, 'INST_TEKKZY_MAIN');
  });

  // ===========================================================================
  // 6.6: E2E User Profile Lambda Handlers Execution
  // ===========================================================================
  await runTest('6.6 E2E User Profile Lambda Handlers Execution', async () => {
    // 1. POST /api/users
    const postUserEvent = {
      httpMethod: 'POST',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cognitoId: 'cog-exam-ctrl-01',
        fullName: 'Dr. Vivek Menon',
        userType: 'exam_controller',
        phoneNumber: '+919777788888',
        email: 'controller.exams@tekkzy.edu.in',
        department: 'Examination Branch'
      })
    };
    const createRes = await createProfileHandler(postUserEvent);
    assert.strictEqual(createRes.statusCode, 201);

    // 2. GET /api/users/{cognitoId}
    const getEvent = {
      httpMethod: 'GET',
      headers: { 'institutionId': 'INST_001' },
      pathParameters: { cognitoId: 'cog-exam-ctrl-01' }
    };
    const getRes = await getProfileHandler(getEvent);
    assert.strictEqual(getRes.statusCode, 200);
    const retrievedUser = JSON.parse(getRes.body).data;
    assert.strictEqual(retrievedUser.fullName, 'Dr. Vivek Menon');

    // 3. PUT /api/users/{cognitoId}
    const updateEvent = {
      httpMethod: 'PUT',
      headers: { 'institutionId': 'INST_001', 'Content-Type': 'application/json' },
      pathParameters: { cognitoId: 'cog-exam-ctrl-01' },
      body: JSON.stringify({ designation: 'Senior Controller of Examinations' })
    };
    const updateRes = await updateProfileHandler(updateEvent);
    assert.strictEqual(updateRes.statusCode, 200);

    // 4. GET /api/users
    const listEvent = {
      httpMethod: 'GET',
      headers: { 'institutionId': 'INST_001' },
      queryStringParameters: { userType: 'exam_controller' }
    };
    const listRes = await listProfilesHandler(listEvent);
    assert.strictEqual(listRes.statusCode, 200);
    const listData = JSON.parse(listRes.body).data;
    assert.ok(listData.length >= 1);
  });

  console.log('\n========================================================================');
  console.log(`🎉 PHASE 6 RESULT: ${passed}/${total} TESTS PASSED!`);
  console.log('========================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
};

runAllTests().catch((err) => {
  console.error('Fatal error during Phase 6 verification:', err);
  process.exit(1);
});
