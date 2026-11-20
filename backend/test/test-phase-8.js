// backend/test/test-phase-8.js
// Dedicated Phase 8 Verification: Frontend API Client Layer, Local Dev Server, and Postman Collection

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🧪 VERIFYING PHASE 8: FRONTEND SERVICE LAYER & DEV SERVER INTEGRATION');
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
  // ===========================================================================
  // 8.1: Express Dev Server Mounting & Endpoints Audit
  // ===========================================================================
  await runTest('8.1 Express Dev-Server Route Mounting & Endpoint Registration', async () => {
    const devServer = require('../dev-server');
    assert.ok(devServer._router, 'Express dev server router exists');

    // Extract all registered route paths
    const registeredRoutes = [];
    devServer._router.stack.forEach((middleware) => {
      if (middleware.route) {
        registeredRoutes.push(`${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
      }
    });

    const expectedEndpoints = [
      'POST /api/admissions/apply',
      'GET /api/admissions/:applicationId',
      'POST /api/inquiries',
      'GET /api/inquiries',
      'POST /api/placements/recruiters',
      'GET /api/placements/recruiters',
      'POST /api/security/gatepass',
      'GET /api/security/active-visitors',
      'POST /api/notices',
      'GET /api/notices',
      'POST /api/uploads/presigned-url',
      'GET /api/institution/config'
    ];

    for (const exp of expectedEndpoints) {
      assert.ok(
        registeredRoutes.includes(exp),
        `Route ${exp} must be mounted in dev-server`
      );
    }
  });

  // ===========================================================================
  // 8.2: Postman Collection Validation
  // ===========================================================================
  await runTest('8.2 Postman v2.1.0 Collection Schema & Endpoints Audit', async () => {
    const postmanPath = path.join(__dirname, '../../tekkzy-college.postman_collection.json');
    assert.ok(fs.existsSync(postmanPath), 'tekkzy-college.postman_collection.json must exist');

    const content = JSON.parse(fs.readFileSync(postmanPath, 'utf8'));
    assert.strictEqual(content.info.name, 'TEKKZY College of Technology — Backend APIs');
    assert.ok(content.item.length >= 7, 'Must have at least 7 microservice folders');

    const folderNames = content.item.map(i => i.name);
    assert.ok(folderNames.some(n => n.includes('Admissions')));
    assert.ok(folderNames.some(n => n.includes('Inquiries')));
    assert.ok(folderNames.some(n => n.includes('Placements')));
    assert.ok(folderNames.some(n => n.includes('Security')));
    assert.ok(folderNames.some(n => n.includes('Notices')));
    assert.ok(folderNames.some(n => n.includes('Uploads')));
    assert.ok(folderNames.some(n => n.includes('Settings')));
  });

  // ===========================================================================
  // 8.3: Frontend API Service File Audit
  // ===========================================================================
  await runTest('8.3 Frontend API Service Exports & Interface Contract', async () => {
    const apiFilePath = path.join(__dirname, '../../frontend/src/services/api.ts');
    assert.ok(fs.existsSync(apiFilePath), 'frontend/src/services/api.ts must exist');

    const content = fs.readFileSync(apiFilePath, 'utf8');
    assert.ok(content.includes('export const admissionsApi'), 'admissionsApi exported');
    assert.ok(content.includes('export const inquiriesApi'), 'inquiriesApi exported');
    assert.ok(content.includes('export const recruitersApi'), 'recruitersApi exported');
    assert.ok(content.includes('export const noticesApi'), 'noticesApi exported');
    assert.ok(content.includes('export const configApi'), 'configApi exported');
    assert.ok(content.includes('export const uploadsApi'), 'uploadsApi exported');
    assert.ok(content.includes('VITE_API_BASE_URL'), 'References VITE_API_BASE_URL');
    assert.ok(content.includes('VITE_INSTITUTION_ID'), 'References VITE_INSTITUTION_ID');
  });

  // ===========================================================================
  // 8.4: Form Wiring In Frontend Pages Audit
  // ===========================================================================
  await runTest('8.4 Frontend Pages Form Wiring Audit', async () => {
    const admissionsPage = fs.readFileSync(path.join(__dirname, '../../frontend/src/pages/AdmissionsPage.tsx'), 'utf8');
    assert.ok(admissionsPage.includes('admissionsApi.apply'), 'AdmissionsPage wired to admissionsApi');
    assert.ok(admissionsPage.includes('inquiriesApi.submit'), 'AdmissionsPage wired to inquiriesApi');

    const contactPage = fs.readFileSync(path.join(__dirname, '../../frontend/src/pages/ContactPage.tsx'), 'utf8');
    assert.ok(contactPage.includes('inquiriesApi.submit'), 'ContactPage wired to inquiriesApi');

    const placementsPage = fs.readFileSync(path.join(__dirname, '../../frontend/src/pages/PlacementsPage.tsx'), 'utf8');
    assert.ok(placementsPage.includes('recruitersApi.register'), 'PlacementsPage wired to recruitersApi');
  });

  console.log('\n========================================================================');
  console.log(`🎉 PHASE 8 RESULT: ${passed}/${total} TESTS PASSED!`);
  console.log('========================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
};

runAllTests().catch((err) => {
  console.error('Fatal error during Phase 8 verification:', err);
  process.exit(1);
});
