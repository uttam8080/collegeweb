# TEKKZY College of Technology — Platform & ERP
## Master Phase-Wise Implementation Plan & Status Tracker

**Project:** TEKKZY College Website & Campus ERP  
**Architecture:** AWS Serverless (AWS Lambda · API Gateway · DynamoDB · Cognito · S3 · SES)  
**Multi-Tenancy Rule:** Every table uses `institutionId` as the Partition Key (PK) extracted strictly from Cognito JWT tokens.  
**Last Updated:** November 2026  

---

## Executive Phase Overview

| Phase | Milestone Name | Key Deliverables & Modules | Status |
| :---: | :--- | :--- | :---: |
| **Phase 1** | **Backend Scaffolding & Foundation** | `serverless.yml`, `package.json`, core utilities (`db.js`, `helpers.js`, `logger.js`, `validator.js`, `constants.js`) | ✅ **COMPLETED** |
| **Phase 2** | **Multi-Tenant Middleware & Settings** | `middleware.js` (JWT claim extraction, `institutionId` scoping, CORS), `CollegeConfig.js` model & endpoints | ✅ **COMPLETED** |
| **Phase 3** | **Public Admissions & Inquiries APIs** | `AdmissionApplication.js`, `InquiryLead.js`, 7 REST endpoints for applications and helpdesk leads | ✅ **COMPLETED** |
| **Phase 4** | **Corporate Placements & S3 Uploads** | `PlacementRecruiter.js`, `s3.js` pre-signed upload URL generator, recruiter lead registration endpoints | ✅ **COMPLETED** |
| **Phase 5** | **Campus Gate Security & Visitor Passes** | `SecurityGatePass.js`, digital pass creation, QR/code verification, checkout timestamps, active visitor queries | ✅ **COMPLETED** |
| **Phase 6** | **Official Gazette & Notice Services** | `GazetteNotice.js`, circular publication, category filtering (`examination`, `placements`), homepage ticker feed | ✅ **COMPLETED** |
| **Phase 7** | **Cognito Auth & User Management** | `UserProfile.js`, 14-role RBAC directory (`admin`, `teacher`, `student`, `security`, `recruiter`), profile CRUD | ✅ **COMPLETED** |
| **Phase 8** | **Frontend Integration & Live Verification** | Connect React forms (`AdmissionsPage`, `ContactPage`, `PlacementsPage`, `NoticeAndEventsSection`) to API Gateway | 🚀 **** |

---

## Detailed Phase-by-Phase Breakdown

```
                                      SERVERLESS BACKEND CODE MAP
                                      
 serverless/
 ├── serverless.yml              [Phase 1] ──► AWS Lambda + API Gateway + 7 DynamoDB Tables
 ├── package.json                [Phase 1] ──► Dependencies (aws-sdk, esbuild, serverless plugins)
 │
 ├── utils/                      [Phase 1 & 2]
 │   ├── constants.js            ──► Tables, User Types, Admission & Pass Status Enums
 │   ├── db.js                   ──► DynamoDB DocumentClient wrapper (put, get, query, update, delete)
 │   ├── middleware.js           ──► JWT Decoding, institutionId extraction, CORS, Error handling
 │   ├── helpers.js              ──► Standard API responses (200, 201, 400, 404, 500), UUID, Epoch
 │   ├── logger.js               ──► CloudWatch structured JSON logging with context requestId
 │   ├── validator.js            ──► Request body field & type validator
 │   └── s3.js                   ──► Pre-signed S3 upload & download URLs
 │
 ├── models/                     [Phase 2 to 7]
 │   ├── CollegeConfig.js        ──► [Phase 2] Institution Profile, Sessions, Fee Slabs
 │   ├── AdmissionApplication.js ──► [Phase 3] Direct Student Applications & Audit Trail
 │   ├── InquiryLead.js          ──► [Phase 3] Public Website Contact & Helpdesk Inquiries
 │   ├── PlacementRecruiter.js   ──► [Phase 4] Corporate Recruiter Partnerships & Drives
 │   ├── SecurityGatePass.js     ──► [Phase 5] Campus Visitor Gate Passes & Checkout Logs
 │   ├── GazetteNotice.js        ──► [Phase 6] Official Notices, Exam Circulars & Ticker Feed
 │   └── UserProfile.js          ──► [Phase 7] Students, Teachers, Admins, Security, Recruiters
 │
 ├── functions/                  [Phase 2 to 7]
 │   ├── settings/               ──► get-college-config.js, update-college-config.js
 │   ├── admissions/             ──► apply.js, list-applications.js, get-application.js, update-status.js
 │   ├── inquiries/              ──► create-inquiry.js, list-inquiries.js
 │   ├── placements/             ──► create-recruiter.js, list-recruiters.js
 │   ├── security/               ──► create-gatepass.js, checkout-gatepass.js, list-active-visitors.js
 │   ├── notices/                ──► publish-notice.js, list-notices.js, delete-notice.js
 │   ├── uploads/                ──► get-upload-url.js (S3 Pre-signed URLs)
 │   └── user/                   ──► create-profile.js, get-profile.js, list-profiles.js
 │
 └── test/
     └── test-college-phases.js  ──► Automated Verification Suite (7/7 Phases Passed)
```

---

### Phase 1: Backend Scaffolding & Foundation ✅ [COMPLETED]
- **Goal:** Set up the isolated `serverless/` environment, define CloudFormation infrastructure in `serverless.yml`, and build the core database & logging wrappers.
- **Key Deliverables:**
  - `serverless/package.json` (`tekkzy-college-backend`)
  - `serverless/serverless.yml` (AWS Provider, least-privilege IAM policies, 7 DynamoDB tables)
  - `serverless/utils/constants.js`
  - `serverless/utils/db.js` (DynamoDB DocumentClient wrapper with retry logic)
  - `serverless/utils/logger.js` (CloudWatch structured JSON logger)
  - `serverless/utils/helpers.js` (Standardized HTTP response builder)
  - `serverless/utils/validator.js` (Payload validator)

---

### Phase 2: Multi-Tenant Middleware & Institutional Scoping ✅ [COMPLETED]
- **Goal:** Enforce strict multi-tenancy where each college is isolated via `institutionId` extracted strictly from Cognito JWT tokens.
- **Key Deliverables:**
  - `serverless/utils/middleware.js`:
    - Case-insensitive header lookup.
    - JWT token parsing and claims extraction.
    - Request body JSON parsing.
    - CloudWatch request ID correlation.
  - `serverless/models/CollegeConfig.js`
  - `GET /api/institution/config` (`functions/settings/get-college-config.js`)
  - `PUT /api/institution/config` (`functions/settings/update-college-config.js`)

---

### Phase 3: Public Admissions & Inquiries Microservices ✅ [COMPLETED]
- **Goal:** Power direct student admissions applications and public helpdesk inquiries with automated tracking.
- **Key Deliverables:**
  - `serverless/models/AdmissionApplication.js` (PK: `institutionId`, SK: `applicationId`)
  - `serverless/models/InquiryLead.js` (PK: `institutionId`, SK: `inquiryId`)
  - `POST /api/admissions/apply` (Creates application, generates `applicationId`, status `applied`)
  - `GET /api/admissions` (Filter by status, department, academic session)
  - `GET /api/admissions/{applicationId}`
  - `PUT /api/admissions/{applicationId}/status` (`applied` $\rightarrow$ `under_review` $\rightarrow$ `offer_issued` $\rightarrow$ `enrolled`)
  - `POST /api/inquiries` (Helpdesk, contact page leads)
  - `GET /api/inquiries`

---

### Phase 4: Corporate Placements & S3 Upload Service ✅ [COMPLETED]
- **Goal:** Handle corporate recruiter drive registrations and provide secure S3 pre-signed upload URLs for candidate marksheets and resumes.
- **Key Deliverables:**
  - `serverless/utils/s3.js` (V4 signature pre-signed URL generator)
  - `serverless/models/PlacementRecruiter.js` (PK: `institutionId`, SK: `recruiterId`)
  - `POST /api/placements/recruiters`
  - `GET /api/placements/recruiters` (List visiting corporate recruiters & partners)
  - `POST /api/uploads/presigned-url` (Direct S3 upload URL for candidate PDFs, marksheets)

---

### Phase 5: Campus Gate Security & Visitor Pass Services ✅ [COMPLETED]
- **Goal:** Digitize campus main gate operations, visitor check-in, host notification, and checkout timestamping.
- **Key Deliverables:**
  - `serverless/models/SecurityGatePass.js` (PK: `institutionId`, SK: `passId`)
  - `POST /api/security/gatepass` (Generates pass with `inside_campus` status)
  - `PUT /api/security/gatepass/{passId}/checkout` (Records departure timestamp and `checked_out` status)
  - `GET /api/security/active-visitors` (Live list of visitors currently on campus grounds)

---

### Phase 6: Official Gazette Notices & Announcement Tickers ✅ [COMPLETED]
- **Goal:** Power official college notifications, examination circulars, date-sheets, and top website ticker announcements.
- **Key Deliverables:**
  - `serverless/models/GazetteNotice.js` (PK: `institutionId`, SK: `noticeId`)
  - `POST /api/notices` (Publish notice with categories: `examination`, `academics`, `placements`, `events`, `ticker`)
  - `GET /api/notices` (Filter by category, urgency, and audience)
  - `DELETE /api/notices/{noticeId}` (Archive or delete expired circular)

---

### Phase 7: Cognito Auth & RBAC User Management ✅ [COMPLETED]
- **Goal:** User directory management covering all 14 institutional roles defined in the RBAC matrix.
- **Key Deliverables:**
  - `serverless/models/UserProfile.js` (PK: `institutionId`, SK: `cognitoId`)
  - `POST /api/users` (Provision student, faculty, accountant, security, recruiter profile)
  - `GET /api/users/{cognitoId}`
  - `GET /api/users` (Filter by `userType` and department)
  - Full automated test suite verification in `serverless/test/test-college-phases.js` (**7/7 tests passed**).

---

### Phase 8: Frontend API Integration & End-to-End Verification 🚀 [NEXT STEP]
- **Goal:** Wire up the Vite React frontend forms to call the live Serverless REST API endpoints instead of local mock state.
- **Key Actions:**
  1. Create `src/services/api.ts` with typed methods for Admissions, Inquiries, Placements, Security, and Notices.
  2. Connect `AdmissionsPage.tsx`: Wire the Direct Application modal and Helpdesk inquiry forms.
  3. Connect `PlacementsPage.tsx`: Wire the Recruiter Partnership registration form.
  4. Connect `ContactPage.tsx`: Wire the General Contact and campus inquiry form.
  5. Connect `NoticeAndEventsSection.tsx` & `AnnouncementTicker.tsx`: Stream real notices from the backend.
  6. Connect `StaffSecurityPage.tsx`: Wire gate pass generation and visitor lookup.
