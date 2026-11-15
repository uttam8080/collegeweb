// serverless/test/test-phase-2.js
// Dedicated Phase 2 Verification: Multi-Tenant Middleware & College Settings

const assert = require('assert');

// In-memory mock DynamoDB for isolated unit testing
const mockDb = new Map();
const db = require('../utils/db');

db.put = async (tableName, item) => {
  const table = mockDb.get(tableName) || new Map();
  const key = `${item.institutionId}_${item.index}`;
  table.set(key, JSON.parse(JSON.stringify(item)));
  mockDb.set(tableName, table);
  return { Attributes: item };
};

db.get = async (tableName, keyObj) => {
  const table = mockDb.get(tableName);
  if (!table) return {};
  const key = `${keyObj.institutionId}_${keyObj.index}`;
  const item = table.get(key);
  return { Item: item ? JSON.parse(JSON.stringify(item)) : undefined };
};

console.log('========================================================================');
console.log('🧪 VERIFYING PHASE 2: MULTI-TENANT MIDDLEWARE & COLLEGE SETTINGS');
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
  const { useMiddleware, getInstitutionId, getAuthUser } = require('../utils/middleware');

  // Test 2.1: Middleware JSON Parsing & Error Catching
  await runTest('2.1 Middleware JSON Parsing & Automatic CORS Headers', async () => {
    let capturedBody = null;
    const testHandler = useMiddleware(async (event) => {
      capturedBody = event.body;
      return { statusCode: 200, headers: {}, body: JSON.stringify({ ok: true }) };
    });

    const eventWithJsonString = {
      httpMethod: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testKey: 'helloWorld' })
    };

    const res = await testHandler(eventWithJsonString, { awsRequestId: 'req-phase-2-test' });
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(capturedBody.testKey, 'helloWorld');

    // Test malformed JSON
    const malformedEvent = {
      httpMethod: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ invalidJson: '
    };
    const badRes = await testHandler(malformedEvent, { awsRequestId: 'req-bad-json' });
    assert.strictEqual(badRes.statusCode, 400);
    const badBody = JSON.parse(badRes.body);
    assert.strictEqual(badBody.success, false);
    assert.strictEqual(badBody.message, 'Invalid JSON request body');
  });

  // Test 2.2: Multi-Tenancy Token Claim Extraction (JWT)
  await runTest('2.2 Secure Multi-Tenancy JWT Claim Extraction', async () => {
    // Generate a valid mock JWT payload with custom:institutionId
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const payload = Buffer.from(JSON.stringify({
      sub: 'usr-12345',
      email: 'dean@tekkzy.edu.in',
      'custom:institutionId': 'INST_001',
      'custom:userType': 'admin'
    })).toString('base64');
    const mockJwt = `${header}.${payload}.mockSignature`;

    const event = {
      headers: {
        authorization: `Bearer ${mockJwt}`
      }
    };

    const institutionId = getInstitutionId(event);
    assert.strictEqual(institutionId, 'INST_001');

    const authUser = getAuthUser(event);
    assert.ok(authUser);
    assert.strictEqual(authUser.cognitoId, 'usr-12345');
    assert.strictEqual(authUser.institutionId, 'INST_001');
    assert.strictEqual(authUser.userType, 'admin');
  });

  // Test 2.3: Cross-Tenant Isolation (College A vs College B)
  await runTest('2.3 Cross-Tenant Isolation Between Colleges (INST_001 vs INST_002)', async () => {
    const CollegeConfig = require('../models/CollegeConfig');

    // Update College A (INST_001)
    await CollegeConfig.updateCollegeProfile('INST_001', {
      collegeName: 'TEKKZY Institute of Technology (Campus A)',
      establishedYear: 2005
    });

    // Update College B (INST_002)
    await CollegeConfig.updateCollegeProfile('INST_002', {
      collegeName: 'TEKKZY Polytechnic College (Campus B)',
      establishedYear: 2012
    });

    // Query College A
    const profileA = await CollegeConfig.getCollegeProfile('INST_001');
    assert.strictEqual(profileA.collegeName, 'TEKKZY Institute of Technology (Campus A)');
    assert.strictEqual(profileA.establishedYear, 2005);

    // Query College B
    const profileB = await CollegeConfig.getCollegeProfile('INST_002');
    assert.strictEqual(profileB.collegeName, 'TEKKZY Polytechnic College (Campus B)');
    assert.strictEqual(profileB.establishedYear, 2012);

    // Verify complete data separation
    assert.notStrictEqual(profileA.collegeName, profileB.collegeName);
  });

  // Test 2.4: Endpoint GET /api/institution/config
  await runTest('2.4 Endpoint GET /api/institution/config', async () => {
    const getConfig = require('../functions/settings/get-college-config');

    const res = await getConfig.main({
      httpMethod: 'GET',
      headers: { institutionId: 'INST_001' }
    });

    assert.strictEqual(res.statusCode, 200);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.institutionId, 'INST_001');
    assert.strictEqual(body.data.collegeName, 'TEKKZY Institute of Technology (Campus A)');
  });

  // Test 2.5: Endpoint PUT /api/institution/config
  await runTest('2.5 Endpoint PUT /api/institution/config', async () => {
    const updateConfig = require('../functions/settings/update-college-config');

    const res = await updateConfig.main({
      httpMethod: 'PUT',
      headers: { institutionId: 'INST_001' },
      body: {
        tagline: 'Leading Autonomous Technical Institution in Eastern India',
        contactPhone: '+91 674 6633999'
      }
    });

    assert.strictEqual(res.statusCode, 200);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.tagline, 'Leading Autonomous Technical Institution in Eastern India');
    assert.strictEqual(body.data.contactPhone, '+91 674 6633999');
    assert.ok(body.data.updatedAt > 0);
  });

  console.log('\n========================================================================');
  console.log(`🎉 PHASE 2 RESULT: ${passed}/${total} TESTS PASSED!`);
  console.log('========================================================================\n');
};

runAllTests().catch((err) => {
  console.error('Fatal Phase 2 Test Error:', err);
  process.exit(1);
});
