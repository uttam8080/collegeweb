// backend/test/test-college-phases.js
// Master Test Runner for all TEKKZY College of Technology Serverless Phases (1 to 7)

const { execSync } = require('child_process');
const path = require('path');

const phases = [
  { num: 1, name: 'Phase 1: Backend Scaffolding & Foundation', file: 'test-phase-1.js' },
  { num: 2, name: 'Phase 2: Multi-Tenant Middleware & College Settings', file: 'test-phase-2.js' },
  { num: 3, name: 'Phase 3: Public Admissions & Inquiries Microservices', file: 'test-phase-3.js' },
  { num: 4, name: 'Phase 4: Corporate Placements & Campus Security', file: 'test-phase-4.js' },
  { num: 5, name: 'Phase 5: Official Notices & S3 Document Uploads', file: 'test-phase-5.js' },
  { num: 6, name: 'Phase 6: Multi-Tenant RBAC User Directory & Cognito', file: 'test-phase-6.js' },
  { num: 7, name: 'Phase 7: End-to-End Multi-Tenant Cross-Service Suite', file: 'test-phase-7.js' },
  { num: 8, name: 'Phase 8: Frontend Service Layer & Dev Server Suite', file: 'test-phase-8.js' }
];

console.log('========================================================================');
console.log('🚀 TEKKZY COLLEGE OF TECHNOLOGY — FULL BACKEND SUITE RUNNER');
console.log('========================================================================\n');

let passedPhases = 0;
const results = [];

for (const phase of phases) {
  const filePath = path.join(__dirname, phase.file);
  process.stdout.write(`▶ Running ${phase.name} (${phase.file})... `);
  try {
    execSync(`node "${filePath}"`, { stdio: 'pipe' });
    console.log('✅ PASSED');
    passedPhases++;
    results.push({ ...phase, status: 'PASSED' });
  } catch (err) {
    console.log('❌ FAILED');
    results.push({ ...phase, status: 'FAILED', error: err.message });
  }
}

console.log('\n========================================================================');
console.log('📊 MASTER TEST EXECUTION SUMMARY:');
console.log('========================================================================');
results.forEach((r) => {
  const badge = r.status === 'PASSED' ? '✅' : '❌';
  console.log(`${badge} ${r.name}`);
});
console.log('========================================================================');
console.log(`🎯 TOTAL SUITE RESULT: ${passedPhases}/${phases.length} PHASES PASSED (100% GREEN)`);
console.log('========================================================================\n');

if (passedPhases !== phases.length) {
  process.exit(1);
}
