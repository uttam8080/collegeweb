// serverless/test/test-phase-1.js
// Dedicated Phase 1 Foundation Verification Test

const assert = require('assert');

console.log('========================================================================');
console.log('🧪 VERIFYING PHASE 1: BACKEND SCAFFOLDING & FOUNDATION');
console.log('========================================================================\n');

let passed = 0;
let total = 0;

const runTest = (name, fn) => {
  total++;
  try {
    fn();
    console.log(`✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
  }
};

// 1. Constants verification
runTest('1.1 Constants & Table Configurations', () => {
  const constants = require('../utils/constants');
  assert.ok(constants.TABLES.USER_PROFILE, 'USER_PROFILE table name missing');
  assert.ok(constants.TABLES.ADMISSIONS, 'ADMISSIONS table name missing');
  assert.ok(constants.TABLES.INQUIRIES, 'INQUIRIES table name missing');
  assert.ok(constants.TABLES.PLACEMENTS, 'PLACEMENTS table name missing');
  assert.ok(constants.TABLES.SECURITY_LOGS, 'SECURITY_LOGS table name missing');
  assert.ok(constants.TABLES.NOTICES, 'NOTICES table name missing');
  assert.ok(constants.TABLES.CONFIG, 'CONFIG table name missing');
  assert.strictEqual(constants.DEFAULT_INSTITUTION_ID, 'TAT_MAIN_CAMPUS');
  assert.ok(constants.USER_TYPES.includes('student'));
  assert.ok(constants.USER_TYPES.includes('teacher'));
  assert.ok(constants.USER_TYPES.includes('security'));
});

// 2. Helpers verification
runTest('1.2 Response Helper Format & CORS Headers', () => {
  const helpers = require('../utils/helpers');

  const ok = helpers.success({ college: 'TEKKZY' }, 'Success message');
  assert.strictEqual(ok.statusCode, 200);
  assert.strictEqual(ok.headers['Access-Control-Allow-Origin'], '*');
  const okBody = JSON.parse(ok.body);
  assert.strictEqual(okBody.success, true);
  assert.strictEqual(okBody.data.college, 'TEKKZY');

  const created = helpers.created({ id: '123' });
  assert.strictEqual(created.statusCode, 201);

  const badReq = helpers.badRequest('Missing field');
  assert.strictEqual(badReq.statusCode, 400);

  const notFound = helpers.notFound('Not found');
  assert.strictEqual(notFound.statusCode, 404);

  const epoch = helpers.getEpoch();
  assert.ok(typeof epoch === 'number' && epoch > 1700000000);

  const uuid = helpers.generateUUID('TAT');
  assert.ok(uuid.startsWith('TAT-'));
});

// 3. Validator verification
runTest('1.3 Payload Validator Rules', () => {
  const { validate } = require('../utils/validator');

  const schema = {
    applicantName: { required: true, type: 'string' },
    applicantEmail: { required: true, type: 'string' },
    examScore: { required: true, type: 'string' }
  };

  const validData = {
    applicantName: 'Rohan Sharma',
    applicantEmail: 'rohan@example.com',
    examScore: '92.5%'
  };
  assert.strictEqual(validate(validData, schema), null);

  const invalidData = {
    applicantName: 'Rohan Sharma'
  };
  const errors = validate(invalidData, schema);
  assert.ok(Array.isArray(errors));
  assert.ok(errors.some(e => e.includes('applicantEmail')));
});

// 4. Logger verification
runTest('1.4 Structured CloudWatch Logger & Request ID Correlation', () => {
  const logger = require('../utils/logger');
  logger.setRequestId('aws-req-test-999');
  assert.doesNotThrow(() => {
    logger.info('Test log event', { action: 'verification' });
    logger.warn('Test warn event');
  });
});

console.log('\n========================================================================');
console.log(`🎉 PHASE 1 RESULT: ${passed}/${total} TESTS PASSED!`);
console.log('========================================================================\n');
