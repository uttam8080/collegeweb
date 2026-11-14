# TEKKZY College of Technology — Platform & ERP
## AWS Serverless Backend Design Document

**Version:** 2.0  
**Last Updated:** November 2026  
**Audience:** Engineering Team, Backend Developers & Interns  
**Tech Stack:** AWS Lambda · Amazon API Gateway · Amazon DynamoDB · Amazon Cognito · Amazon S3 · Amazon SES  

---

## 1. Architecture Overview

```
                               ┌────────────────────────────────────────────────────────┐
                               │             Client Applications (Frontend)             │
                               │  - Public College Web Portal (Vite React + GSAP/Lenis) │
                               │  - Staff / Student / Security / Admin ERP Dashboard    │
                               └─────────────────────────┬──────────────────────────────┘
                                                         │ HTTPS REST Calls
                                                         ▼
                               ┌────────────────────────────────────────────────────────┐
                               │           Amazon API Gateway (HTTP / REST API)         │
                               │  - Route Routing, CORS, Rate Limiting, Throttling      │
                               │  - Cognito JWT Authorizer (Claims: institutionId, role)│
                               └─────────────────────────┬──────────────────────────────┘
                                                         │
                                                         ▼
                               ┌────────────────────────────────────────────────────────┐
                               │                  AWS Lambda Functions                  │
                               │               (Node.js 20+ / TypeScript)               │
                               │                                                        │
                               │  ├── auth-service         ├── notices-service          │
                               │  ├── admissions-service   ├── security-gate-service    │
                               │  ├── inquiries-service    ├── fees-accounts-service    │
                               │  ├── placements-service   ├── config-service           │
                               │  └── s3-upload-service    └── gemini-ai-advisor-service│
                               └──────────┬──────────────┬──────────────┬───────────────┘
                                          │              │              │
                    ┌─────────────────────▼──┐    ┌──────▼────────┐   ┌─▼──────────────┐
                    │    Amazon DynamoDB     │    │   Amazon S3   │   │   Amazon SES   │
                    │   (6 Serverless DBs)   │    │  (Docs, Marks │   │ (Transactional │
                    │ - user-profile         │    │  Sheets, PDFs,│   │  Ack & Alerts) │
                    │ - admissions           │    │  Certificates)│   └────────────────┘
                    │ - inquiries-leads      │    └───────────────┘
                    │ - placements-recruiters│           ▲
                    │ - staff-security-logs  │           │ Pre-signed URLs
                    │ - notices-gazette      │           │
                    │ - config-variable      │           │
                    └────────────────────────┘    ┌──────┴──────────────┐
                                                  │  Amazon Cognito IDP │
                                                  │ (User Directory &   │
                                                  │  RBAC JWT Claims)   │
                                                  └─────────────────────┘
```

### How It Works
1. **Frontend Request**: The client application (Public Portal or ERP Dashboard) sends an HTTPS REST request to Amazon API Gateway.
2. **Authentication & Authorization**: API Gateway checks the bearer JWT issued by Amazon Cognito. It validates the user’s identity, extracts the `institutionId` (multi-tenant/campus key) and `userType` (role), and passes authorized claims to the downstream Lambda function.
3. **Serverless Compute**: Lambda processes business logic, enforces fine-grained permissions, interacts with DynamoDB, signs Amazon S3 pre-signed upload URLs, or calls Gemini Flash for AI-assisted inquiries.
4. **Data & Storage**: DynamoDB tables store transactional and profile records with millisecond latency. Large files (marks cards, ID proofs, recruiter brochures) are stored securely in Amazon S3.
5. **Notifications**: Amazon SES dispatches automated email acknowledgments with application IDs, fee receipts, and gate pass codes.

---

## 2. Multi-Tenancy Explained

> [!IMPORTANT]
> **This software is sold to multiple colleges / institutions.** Each college is a separate **"institution."**
> The `institutionId` field keeps their data completely separate.

### Example
- **College A** has `institutionId = "INST_001"`
- **College B** has `institutionId = "INST_002"`
- When College A calls `list-profile` (or `list-applications`, `list-notices`), they **only see College A's data — never College B's data.**

### Rule
**Every DynamoDB table uses `institutionId` as the partition key.** Every API extracts `institutionId` from the Cognito JWT token, so no college can ever access another college's data.

---

## 3. AI Model Integration & Cost Optimization Strategy

To provide intelligent student assistance (admissions counselor chatbot, AI syllabus advisor, and research lab queries) without escalating operational costs:
1. **Free-Tier Primary**: Leverage Google Gemini 2.0 / 1.5 Flash via `@google/genai` for sub-second responses.
2. **Rotation Pool**: Maintain a pool of 4–5 API keys stored securely in AWS Secrets Manager / SSM Parameter Store.
3. **Fallback & Circuit Breaker**: If key rate-limits are reached (HTTP 429), the Lambda function automatically fails over to the next available key in the rotation pool before degrading gracefully.

---

## 4. Database Tables & Attributes (Amazon DynamoDB)

The system is powered by six primary DynamoDB tables. All timestamps are stored as numeric Epoch millisecond timestamps (`createdAt`, `updatedAt`). All record IDs (`applicationId`, `inquiryId`, `passId`, etc.) are auto-generated UUID v4 strings.

---

### 4.1 Table: `tekkzy-user-profile`
**Purpose:** Stores user profiles across all institution roles — Admins, Faculty/Teachers, Students, Parents, Recruiters, Gate Security, and Accountants.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `cognitoId` | String |

*Note: `cognitoId` is the unique UUID generated by AWS Cognito User Pools (`sub`). `cognitoId = userId` throughout the platform.*

#### All Attributes
| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Institute campus ID (e.g. `TAT_MAIN_CAMPUS`) |
| 2 | `cognitoId` | String | Yes (SK) | Unique AWS Cognito User Sub ID |
| 3 | `fullName` | String | Yes | Full name of the user |
| 4 | `userType` | String | Yes | One of: `admin`, `teacher`, `student`, `parent`, `accountant`, `exam_controller`, `security`, `recruiter` |
| 5 | `email` | String | Yes | Unique login email address |
| 6 | `phoneNumber` | String | Yes | Mobile number for SMS/WhatsApp alerts |
| 7 | `department` | String | No | Academic school (e.g. `School of Engineering`, `Polytechnic`) |
| 8 | `rollNumber` | String | No | Student university / college roll number |
| 9 | `designation` | String | No | Faculty / Staff job title |
| 10 | `linkedStudentIds` | List<String> | No | Student `cognitoId`s linked to a parent account |
| 11 | `status` | String | Yes | `active`, `suspended`, `graduated`, `pending_verification` |
| 12 | `avatarUrl` | String | No | S3 profile photo URL |
| 13 | `createdAt` | Number | Yes | Epoch timestamp of account creation |
| 14 | `updatedAt` | Number | No | Epoch timestamp of last profile update |

---

### 4.2 Table: `tekkzy-admissions-applications`
**Purpose:** Tracks the complete lifecycle of direct student applications from initial submission to verification, interview, fee settlement, and enrollment.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `applicationId` | String |

#### Phase 1: Application Submission Attributes
| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Institute ID |
| 2 | `applicationId` | String | Yes (SK) | Unique Application Code (e.g. `TAT-2026-APP-8941`) |
| 3 | `applicantName` | String | Yes | Candidate full legal name |
| 4 | `applicantEmail` | String | Yes | Candidate email |
| 5 | `applicantPhone` | String | Yes | 10-digit phone number |
| 6 | `programName` | String | Yes | Program (e.g. `B.Tech Computer Science & Engineering`) |
| 7 | `schoolCategory` | String | Yes | `School of Engineering`, `School of Polytechnic`, etc. |
| 8 | `qualifyingExam` | String | Yes | `JEE Main`, `OJEE`, `12th Science Board`, etc. |
| 9 | `examScore` | String | Yes | Score, Rank, or Percentage |
| 10 | `category` | String | No | `General`, `OBC`, `SC/ST`, `TFW` |
| 11 | `status` | String | Yes | Current status (see Section 8: Status Lifecycle) |
| 12 | `appliedDate` | Number | Yes | Epoch timestamp of submission |

#### Phase 2: Verification, Documents & Enrollment Attributes
| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 13 | `documents` | List<Map> | No | S3 references to 10th marksheet, 12th marksheet, JEE rank card |
| 14 | `verifiedBy` | String | No | Staff `cognitoId` who audited records |
| 15 | `admissionOfferId` | String | No | Unique provisional admission letter reference |
| 16 | `scholarshipGranted` | Map | No | `{ "scheme": "Merit Excellence", "amount": 25000, "percentage": 30 }` |
| 17 | `feePaymentStatus` | String | No | `pending`, `partial`, `paid` |
| 18 | `enrolledStudentId` | String | No | Final student `cognitoId` assigned upon fee clearance |
| 19 | `updatedAt` | Number | No | Epoch timestamp of last audit update |

```json
// Sample Document Object in `documents`
{
  "docType": "12th_marksheet",
  "fileName": "rahul_12th_board.pdf",
  "s3Key": "documents/admissions/TAT-2026-APP-8941/rahul_12th_board.pdf",
  "verified": true,
  "uploadedAt": 1794567200000
}
```

---

### 4.3 Table: `tekkzy-inquiries-leads`
**Purpose:** Stores public inquiries from the Helpdesk, Contact Us page, and academic program inquiry cards.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `inquiryId` | String |

| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Institute ID |
| 2 | `inquiryId` | String | Yes (SK) | Unique Lead UUID |
| 3 | `name` | String | Yes | Visitor / Inquirer name |
| 4 | `email` | String | Yes | Contact email |
| 5 | `phone` | String | Yes | Phone number |
| 6 | `programOfInterest`| String | No | Desired academic course |
| 7 | `subjectOrExam` | String | No | Entrance exam or query topic |
| 8 | `message` | String | Yes | Inquiry body text |
| 9 | `source` | String | Yes | `admissions_helpdesk`, `contact_page`, `programs_popup` |
| 10 | `assignedCounselor`| String | No | Staff `cognitoId` handling lead |
| 11 | `status` | String | Yes | `new`, `contacted`, `counseled`, `converted`, `closed` |
| 12 | `createdAt` | Number | Yes | Epoch timestamp |

---

### 4.4 Table: `tekkzy-placements-recruiters`
**Purpose:** Handles corporate recruiter registration, campus drive invitations, and placement statistics records.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `recruiterId` | String |

| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Institute ID |
| 2 | `recruiterId` | String | Yes (SK) | Unique Company UUID |
| 3 | `organizationName` | String | Yes | Corporate entity name (e.g. `Google`, `TCS`, `Infosys`) |
| 4 | `category` | String | Yes | `Tech Giants`, `Consulting & IT`, `Core Engineering`, `FinTech` |
| 5 | `contactPerson` | String | Yes | HR / Campus Relations Lead name |
| 6 | `contactEmail` | String | Yes | Work email address |
| 7 | `hiringRoles` | List<String> | No | e.g. `["Cloud Engineer", "Full Stack Developer"]` |
| 8 | `ctcRange` | String | No | e.g. `₹8.5 LPA - ₹18.0 LPA` |
| 9 | `driveDateProposed` | String | No | Proposed date (ISO format) |
| 10 | `driveStatus` | String | Yes | `inquiry_received`, `shortlisted`, `scheduled`, `completed` |
| 11 | `totalOffers` | Number | No | Offers generated for current cycle |
| 12 | `createdAt` | Number | Yes | Epoch timestamp |

---

### 4.5 Table: `tekkzy-staff-security-logs`
**Purpose:** Digital gate verification, visitor entry passes, and campus security incident management.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `passId` | String |

| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Institute ID |
| 2 | `passId` | String | Yes (SK) | Unique Pass ID / QR Token (e.g. `SEC-PASS-9821`) |
| 3 | `visitorName` | String | Yes | Name of visitor / vendor / external scholar |
| 4 | `visitorPhone` | String | Yes | Contact phone number |
| 5 | `purpose` | String | Yes | `Admission Counseling`, `Official Meeting`, `Vendor Delivery` |
| 6 | `personToMeet` | String | Yes | Staff or Department name |
| 7 | `vehicleNumber` | String | No | Vehicle registration if vehicle entered campus |
| 8 | `checkInTime` | Number | Yes | Epoch timestamp of gate entry |
| 9 | `checkOutTime` | Number | No | Epoch timestamp of gate exit |
| 10 | `issuedByGuardId` | String | Yes | `cognitoId` of security personnel at gate |
| 11 | `status` | String | Yes | `inside_campus`, `checked_out`, `flagged_security` |

---

### 4.6 Table: `tekkzy-notices-gazette`
**Purpose:** Official Gazette publications, circulars, examination date-sheets, and ticker notices.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `noticeId` | String |

| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Institute ID |
| 2 | `noticeId` | String | Yes (SK) | Notice identifier (e.g. `NOT-2026-BPUT-041`) |
| 3 | `title` | String | Yes | Notice headline |
| 4 | `category` | String | Yes | `examination`, `academics`, `placements`, `events`, `ticker` |
| 5 | `summary` | String | Yes | Brief description |
| 6 | `content` | String | No | Full markdown / text content |
| 7 | `attachmentUrl` | String | No | S3 URL to official gazette PDF |
| 8 | `targetAudience` | List<String> | Yes | `["all"]`, `["students"]`, `["faculty"]`, `["btech_cse"]` |
| 9 | `isUrgentTicker` | Boolean | Yes | Flags whether notice appears on top announcement ticker |
| 10 | `publishedBy` | String | Yes | Staff/Registrar `cognitoId` |
| 11 | `publishedAt` | Number | Yes | Epoch timestamp |
| 12 | `expiresAt` | Number | No | Expiration timestamp for auto-archiving |

---

## 5. Role-Based Access Control (RBAC) Matrix

Derived from the institution's ERP Task Tracker specification:

| Module / Feature | Owner / Trustee | Admin / Dean | Accountant | Faculty / Teacher | Exam Controller | Security Guard | Recruiter | Student | Parent |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dashboard** | Full | Full | Finance | Own Class | Exam Widgets | Gate | Drives | Own | Child |
| **Admissions** | Full | Full | View Fees | — | View | — | — | Apply/Status | Apply/Status |
| **Fees & Payments** | Full | Full | Full | — | — | — | — | Pay/History | Pay/History |
| **Exam & Results** | Full | Full | — | Enter Marks | Full | — | — | View Result | View Result |
| **Security Gatepass**| Full | Full | — | Request | — | Issue/Verify | — | Own Pass | Visitor Pass |
| **Notices & Circulars**| Full | Full | View | Post Own | Post Exam | View | View | View | View |
| **Placements** | Full | Full | — | View | — | — | Post Drives | Apply | View Stats |
| **System Settings** | Full | Limited | — | — | — | — | — | — | — |

---

## 6. API Specifications

> [!IMPORTANT]
> All APIs expect `Content-Type: application/json`.  
> Authenticated endpoints require `Authorization: Bearer <JWT_TOKEN>`.  
> The `institutionId` is extracted automatically from the token and should not be passed in request payloads.

---

### 6.1 Authentication & Profile APIs
| # | API Name | Method | Endpoint | DynamoDB Table |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `login` | `POST` | `/api/auth/login` | `tekkzy-user-profile` |
| 2 | `createUserProfile` | `POST` | `/api/users` | `tekkzy-user-profile` + Cognito |
| 3 | `getUserProfile` | `GET` | `/api/users/{cognitoId}` | `tekkzy-user-profile` |
| 4 | `updateUserProfile` | `PUT` | `/api/users/{cognitoId}` | `tekkzy-user-profile` |

#### `POST /api/auth/login`
- **Flow:**
  1. Authenticates email and password against AWS Cognito User Pool via `InitiateAuth`.
  2. Extracts `cognitoId` (`sub`) and `institutionId` from the returned JWT ID Token.
  3. Queries `tekkzy-user-profile` where `PK = institutionId` and `SK = cognitoId`.
  4. Returns user credentials, active role permissions, and session tokens (`idToken`, `accessToken`, `refreshToken`).

---

### 6.2 Admissions Lifecycle APIs
| # | API Name | Method | Endpoint | DynamoDB Table |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `submitApplication` | `POST` | `/api/admissions/apply` | `tekkzy-admissions-applications` |
| 2 | `listApplications` | `GET` | `/api/admissions/applications` | `tekkzy-admissions-applications` |
| 3 | `getApplicationById` | `GET` | `/api/admissions/{applicationId}` | `tekkzy-admissions-applications` |
| 4 | `updateApplicationStatus` | `PUT` | `/api/admissions/{applicationId}/status` | `tekkzy-admissions-applications` |
| 5 | `attachDocuments` | `PUT` | `/api/admissions/{applicationId}/documents` | `tekkzy-admissions-applications` |

#### `POST /api/admissions/apply`
- **Request Body:**
```json
{
  "applicantName": "Rahul Patra",
  "applicantEmail": "rahul.patra@example.com",
  "applicantPhone": "9876543210",
  "programName": "B.Tech in Computer Science & Engineering",
  "schoolCategory": "School of Engineering",
  "qualifyingExam": "JEE Main",
  "examScore": "94.6 Percentile"
}
```
- **Flow:**
  1. Generates unique `applicationId` (e.g. `TAT-2026-APP-7721`).
  2. Sets `status = "applied"` and `appliedDate = Date.now()`.
  3. Inserts into `tekkzy-admissions-applications`.
  4. Triggers Amazon SES acknowledgment email to candidate with application tracking link.
  5. Returns `{ "applicationId": "TAT-2026-APP-7721", "status": "applied" }`.

---

### 6.3 Public Inquiries & Helpdesk APIs
| # | API Name | Method | Endpoint | DynamoDB Table |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `submitInquiry` | `POST` | `/api/inquiries` | `tekkzy-inquiries-leads` |
| 2 | `listInquiries` | `GET` | `/api/inquiries?status=new` | `tekkzy-inquiries-leads` |
| 3 | `updateInquiryStatus` | `PUT` | `/api/inquiries/{inquiryId}` | `tekkzy-inquiries-leads` |

---

### 6.4 Corporate Recruiters & Placements APIs
| # | API Name | Method | Endpoint | DynamoDB Table |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `registerRecruiterLead` | `POST` | `/api/placements/recruiters` | `tekkzy-placements-recruiters` |
| 2 | `listRecruiterPartners` | `GET` | `/api/placements/recruiters` | `tekkzy-placements-recruiters` |
| 3 | `updateDriveStatus` | `PUT` | `/api/placements/recruiters/{recruiterId}` | `tekkzy-placements-recruiters` |

---

### 6.5 Gate Security & Visitor Pass APIs
| # | API Name | Method | Endpoint | DynamoDB Table |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `createGatePass` | `POST` | `/api/security/gatepass` | `tekkzy-staff-security-logs` |
| 2 | `verifyGatePass` | `GET` | `/api/security/gatepass/{passId}` | `tekkzy-staff-security-logs` |
| 3 | `checkoutGatePass` | `PUT` | `/api/security/gatepass/{passId}/checkout`| `tekkzy-staff-security-logs` |
| 4 | `listActiveCampusVisitors`| `GET`| `/api/security/active-visitors` | `tekkzy-staff-security-logs` |

---

### 6.6 Official Gazette & Notices APIs
| # | API Name | Method | Endpoint | DynamoDB Table |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `listPublicNotices` | `GET` | `/api/notices?category=all` | `tekkzy-notices-gazette` |
| 2 | `publishNotice` | `POST` | `/api/notices` (Admin/Registrar) | `tekkzy-notices-gazette` |
| 3 | `archiveNotice` | `DELETE`| `/api/notices/{noticeId}` | `tekkzy-notices-gazette` |

---

### 6.7 S3 Pre-Signed Uploads API
| # | API Name | Method | Endpoint | Storage |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `getPresignedUrl` | `POST` | `/api/uploads/presigned-url` | Amazon S3 |

- **Request Body:**
```json
{
  "fileName": "jee_main_scorecard.pdf",
  "fileType": "application/pdf",
  "folder": "admissions"
}
```
- **Response:**
```json
{
  "uploadUrl": "https://tekkzy-college-documents.s3.ap-south-1.amazonaws.com/admissions/TAT-APP-8941/jee_main_scorecard.pdf?AWSAccessKeyId=...",
  "s3Key": "admissions/TAT-APP-8941/jee_main_scorecard.pdf"
}
```

---

## 7. Status Lifecycle Reference

### 7.1 Admission Application Status
| Status | Phase | Meaning |
| :--- | :--- | :--- |
| `applied` | Submission | Candidate submitted online form |
| `documents_pending` | Verification | Awaiting marksheet/certificate uploads |
| `under_review` | Academic Audit | Admission committee inspecting eligibility & rank |
| `offer_issued` | Offer | Provisional admission letter issued |
| `fee_paid` | Finance | Admission registration fee cleared |
| `enrolled` | Completed | Student converted into enrolled college record with roll number |
| `rejected` | Terminal | Eligibility criteria not met |

### 7.2 Gate Security Status
| Status | Meaning |
| :--- | :--- |
| `pass_generated` | Visitor pass created; awaiting physical arrival |
| `inside_campus` | Checked in at security gate; badge issued |
| `checked_out` | Visitor exited campus; timestamp stamped |
| `flagged_security` | Security issue or unauthorized stay |

---

## 8. Where to Start Building (Developer / Intern Roadmap)

Follow this structured order to build the backend without friction:

```
Step 1: Setup AWS Infrastructure Foundation
        ├── Provision AWS Cognito User Pool (with custom:institutionId, custom:userType)
        └── Create 6 DynamoDB Tables using On-Demand capacity mode

Step 2: Core Auth & User Profile Services
        ├── Deploy POST /api/auth/login and user profile retrieval
        └── Setup API Gateway HTTP API with Cognito JWT Authorizer

Step 3: Admissions & Inquiries Microservices (Public Web facing)
        ├── Implement POST /api/admissions/apply & SES confirmation triggers
        └── Implement POST /api/inquiries (Helpdesk & Contact form)

Step 4: Amazon S3 Pre-Signed File Upload Handler
        └── Secure document uploading for candidate marksheets & ID proofs

Step 5: Gate Security & Staff Services
        └── Build gate pass generation, QR verification, and visitor checkout

Step 6: Official Gazette & Notice Management
        └── Implement circular publications, ticker feed, and category filters

Step 7: Connect Vite React Frontend to Live API Endpoints
        └── Replace local React state forms with Axios/Fetch calls to API Gateway
```
