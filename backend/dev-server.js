// backend/dev-server.js
// Local Development & Postman HTTP Test Server for TEKKZY College of Technology

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Enable CORS for frontend and tools
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, institutionId, institution, x-api-key');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Adapter helper: converts Express req/res to AWS Lambda event/context
const adapt = (lambdaHandler) => async (req, res) => {
  const event = {
    httpMethod: req.method,
    path: req.path,
    headers: req.headers,
    queryStringParameters: Object.keys(req.query).length ? req.query : null,
    pathParameters: Object.keys(req.params).length ? req.params : null,
    body: typeof req.body === 'object' ? JSON.stringify(req.body) : req.body
  };

  const context = {
    awsRequestId: `local-dev-${Date.now()}`
  };

  try {
    const result = await lambdaHandler(event, context);
    const statusCode = result.statusCode || 200;
    const body = result.body ? JSON.parse(result.body) : {};

    if (result.headers) {
      Object.entries(result.headers).forEach(([k, v]) => res.setHeader(k, v));
    }
    return res.status(statusCode).json(body);
  } catch (err) {
    console.error('[Dev Server Error]', err);
    return res.status(500).json({ error: 'Internal local server execution failure', message: err.message });
  }
};

// ==============================================================================
// 1. ADMISSIONS ROUTES
// ==============================================================================
app.post('/api/admissions/apply', adapt(require('./functions/admissions/apply').main));
app.get('/api/admissions/:applicationId', adapt(require('./functions/admissions/get-application').main));
app.get('/api/admissions', adapt(require('./functions/admissions/list-applications').main));
app.put('/api/admissions/:applicationId/status', adapt(require('./functions/admissions/update-status').main));

// ==============================================================================
// 2. INQUIRIES & HELPDESK ROUTES
// ==============================================================================
app.post('/api/inquiries', adapt(require('./functions/inquiries/create-inquiry').main));
app.get('/api/inquiries', adapt(require('./functions/inquiries/list-inquiries').main));
app.put('/api/inquiries/:inquiryId', adapt(require('./functions/inquiries/update-inquiry').main));

// ==============================================================================
// 3. CORPORATE PLACEMENTS & RECRUITERS
// ==============================================================================
app.post('/api/placements/recruiters', adapt(require('./functions/placements/create-recruiter').main));
app.get('/api/placements/recruiters', adapt(require('./functions/placements/list-recruiters').main));
app.put('/api/placements/recruiters/:recruiterId', adapt(require('./functions/placements/update-recruiter').main));

// ==============================================================================
// 4. CAMPUS SECURITY & GATE PASSES
// ==============================================================================
app.post('/api/security/gatepass', adapt(require('./functions/security/create-gatepass').main));
app.get('/api/security/active-visitors', adapt(require('./functions/security/list-active-visitors').main));
app.put('/api/security/gatepass/:passId/checkout', adapt(require('./functions/security/checkout-gatepass').main));

// ==============================================================================
// 5. OFFICIAL GAZETTE & NOTICES
// ==============================================================================
app.post('/api/notices', adapt(require('./functions/notices/publish-notice').main));
app.get('/api/notices', adapt(require('./functions/notices/list-notices').main));
app.delete('/api/notices/:noticeId', adapt(require('./functions/notices/delete-notice').main));

// ==============================================================================
// 6. S3 DOCUMENT UPLOADS
// ==============================================================================
app.post('/api/uploads/presigned-url', adapt(require('./functions/uploads/get-upload-url').main));

// ==============================================================================
// 7. USER PROFILE & RBAC DIRECTORY
// ==============================================================================
app.post('/api/users', adapt(require('./functions/user/create-profile').main));
app.get('/api/users/:cognitoId', adapt(require('./functions/user/get-profile').main));
app.get('/api/users', adapt(require('./functions/user/list-profiles').main));
app.put('/api/users/:cognitoId', adapt(require('./functions/user/update-profile').main));

// ==============================================================================
// 8. COLLEGE SETTINGS & CONFIG
// ==============================================================================
app.get('/api/institution/config', adapt(require('./functions/settings/get-college-config').main));
app.put('/api/institution/config', adapt(require('./functions/settings/update-college-config').main));

// Server status root
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'TEKKZY College of Technology — Local API Server',
    port,
    docs: 'Import tekkzy-college.postman_collection.json into Postman to test all routes',
    endpoints: [
      'POST /api/admissions/apply',
      'GET  /api/admissions/:applicationId',
      'POST /api/inquiries',
      'GET  /api/inquiries',
      'POST /api/placements/recruiters',
      'GET  /api/placements/recruiters',
      'POST /api/security/gatepass',
      'GET  /api/security/active-visitors',
      'POST /api/notices',
      'GET  /api/notices',
      'POST /api/uploads/presigned-url',
      'GET  /api/institution/config'
    ]
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`\n========================================================================`);
    console.log(`🚀 TEKKZY COLLEGE LOCAL BACKEND SERVER RUNNING`);
    console.log(`📡 URL: http://localhost:${port}`);
    console.log(`🧪 Postman Ready: Import tekkzy-college.postman_collection.json`);
    console.log(`========================================================================\n`);
  });
}

module.exports = app;
