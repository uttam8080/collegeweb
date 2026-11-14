# TEKKZY College of Technology — Platform & ERP
## AWS Serverless Backend Design Document

**Version:** 2.0  
**Last Updated:** November 2026  
**Audience:** Interns & Backend Developers  
**Tech Stack:** AWS Lambda · Amazon API Gateway · Amazon DynamoDB · Amazon Cognito · Amazon S3 · Amazon SES · Google Gemini Flash  

---

## 1. Architecture Overview

```
 ┌──────────────────────────────────────────────────────────────┐
 │                  Client Applications (Frontend)              │
 │   - Public College Web Portal (Vite React + GSAP / Lenis)    │
 │   - Staff, Student & Security ERP Dashboard (React SPS)      │
 └──────────────────────────────┬───────────────────────────────┘
                                │ HTTPS / REST (Axios / Fetch)
                                ▼
 ┌──────────────────────────────────────────────────────────────┐
 │              Amazon API Gateway (HTTP / REST API)            │
 │   - CORS, Request Validation, Route Dispatching              │
 │   - Cognito JWT Authorizer (Extracts institutionId & role)   │
 └──────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
 ┌──────────────────────────────────────────────────────────────┐
 │                    AWS Lambda Functions                      │
 │                                                              │
 │   ├── auth/login.js              ├── security/create-pass.js │
 │   ├── admissions/apply.js        ├── security/verify-pass.js │
 │   ├── admissions/list.js         ├── notices/publish.js      │
 │   ├── inquiries/create.js        ├── notices/list.js         │
 │   ├── placements/recruiter.js    ├── settings/config.js      │
 │   ├── user/profile.js            └── ai/counselor.js         │
 └─────────────┬────────────────┬───────────────┬───────────────┘
               │                │               │
  ┌────────────▼──────────┐ ┌───▼───────────┐ ┌─▼──────────────┐
  │    Amazon DynamoDB    │ │   Amazon S3   │ │   Amazon SES   │
  │   (6 College Tables)  │ │ (Marksheets,  │ │ (Transactional │
  │   - college_user      │ │  Resumes, ID  │ │  Ack & Alerts) │
  │   - college_admissions│ │  Proofs, PDFs)│ └────────────────┘
  │   - college_inquiries │ └───────────────┘
  │   - college_placements│         ▲
  │   - college_security  │         │ Pre-signed URLs
  │   - college_notices   │         │
  │   - college_config    │ ┌───────┴───────────────┐
  │                       │ │   Amazon Cognito IDP  │
  └───────────────────────┘ │ (User Directory &     │
                            │  custom:institutionId)│
                            └───────────────────────┘
```

### How It Works
1. Admin, staff, student, or public candidate uses the portal to make REST API calls.
2. Amazon API Gateway validates the request, handles CORS headers, and routes each endpoint to the appropriate AWS Lambda function.
3. Lambda functions authenticate through Amazon Cognito, read and write to Amazon DynamoDB, sign pre-signed Amazon S3 URLs for document uploads, send transactional email alerts through Amazon SES, and leverage Google Gemini Flash for AI student counseling.
4. Every Lambda function extracts `institutionId` from the Cognito JWT before touching any DynamoDB table to maintain strict multi-tenant isolation.

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

To provide sub-second responses for the **AI Student Admissions Counselor** and **Curriculum Advisory Bot** without recurring operational costs:
1. We utilize the free-tier Google Gemini Flash API (`gemini-2.0-flash` / `gemini-1.5-flash`).
2. We maintain a rotation pool of 4–5 API keys stored in AWS environment variables / SSM Parameter Store.
3. The backend monitors daily token and rate limits. When a key approaches quota limits, it automatically fails over to the next available key in the rotation pool.

---

## 4. Database Tables & Attributes

The system has six primary DynamoDB tables. Every attribute is documented below.

---

### 4.1 Table: `college_user_profile_{stage}`
**Purpose:** Stores all user profiles across the institution — admins, faculty, students, parents, recruiters, and security guards.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `cognitoId` | String |

*Note: `cognitoId` is the unique UUID generated by AWS Cognito (`sub`). It doubles as `userId` — `cognitoId = userId` throughout the system.*

#### All Attributes
| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Which college campus this user belongs to |
| 2 | `cognitoId` | String | Yes (SK) | Unique user ID from Cognito |
| 3 | `fullName` | String | Yes | Full legal name of user |
| 4 | `userType` | String | Yes | One of: `admin`, `teacher`, `student`, `parent`, `accountant`, `exam_controller`, `security`, `recruiter` |
| 5 | `email` | String | Yes | Email address (used as login username) |
| 6 | `phoneNumber` | String | Yes | Phone / WhatsApp number |
| 7 | `department` | String | No | e.g. `Computer Science & Engineering`, `Polytechnic` |
| 8 | `rollNumber` | String | No | University / College Registration Number |
| 9 | `designation` | String | No | Staff designation or job title |
| 10 | `linkedStudentIds` | List<String> | No | Student `cognitoId`s linked to a parent account |
| 11 | `status` | String | Yes | `active`, `suspended`, `graduated`, `pending_verification` |
| 12 | `createdAt` | Number | Yes | Epoch timestamp (always store time as numeric epoch) |
| 13 | `updatedAt` | Number | No | Epoch timestamp of last profile update |

---

### 4.2 Table: `college_admissions_{stage}`
**Purpose:** Tracks the entire lifecycle of a student admission application: Submission $\rightarrow$ Verification $\rightarrow$ Document Uploads $\rightarrow$ Merit Review $\rightarrow$ Offer Letter $\rightarrow$ Fee Clearance $\rightarrow$ Enrollment.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `applicationId` | String |

#### Phase 1 — Application Attributes (Created upon form submission)
| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Which college campus |
| 2 | `applicationId` | String | Yes (SK) | Unique Application Code (e.g. `TAT-2026-APP-8941`) |
| 3 | `applicantName` | String | Yes | Full candidate name |
| 4 | `applicantEmail` | String | Yes | Candidate email |
| 5 | `applicantPhone` | String | Yes | 10-digit mobile number |
| 6 | `programName` | String | Yes | Desired program (e.g. `B.Tech in CSE`) |
| 7 | `schoolCategory` | String | Yes | `School of Engineering`, `School of Polytechnic`, etc. |
| 8 | `qualifyingExam` | String | Yes | `JEE Main`, `OJEE`, `12th Board` |
| 9 | `examScore` | String | Yes | Score, rank, or aggregate percentile |
| 10 | `category` | String | No | `General`, `OBC`, `SC/ST`, `TFW` |
| 11 | `status` | String | Yes | Current lifecycle stage (see Section 7) |
| 12 | `createdAt` | Number | Yes | Epoch timestamp |

#### Phase 2 — Documents & Verification Attributes
| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 13 | `documents` | List<Map> | No | S3 keys for 10th marksheet, 12th marksheet, JEE rank card |
| 14 | `verifiedBy` | String | No | `cognitoId` of verifying admissions officer |
| 15 | `offerLetterId` | String | No | Reference to generated provisional admission offer |
| 16 | `feeStatus` | String | No | `pending`, `partial`, `paid` |
| 17 | `enrolledStudentId`| String | No | Final student `cognitoId` created upon enrollment |
| 18 | `updatedAt` | Number | No | Epoch timestamp |

---

### 4.3 Table: `college_inquiries_{stage}`
**Purpose:** Lead tracking for helpdesk inquiries, website contact forms, and academic program queries.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `inquiryId` | String |

| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Which college campus |
| 2 | `inquiryId` | String | Yes (SK) | Unique Inquiry ID (auto-generated UUID) |
| 3 | `name` | String | Yes | Inquirer full name |
| 4 | `email` | String | Yes | Contact email |
| 5 | `phone` | String | Yes | Contact phone number |
| 6 | `programOfInterest`| String | No | Program or course selected |
| 7 | `message` | String | Yes | Query message |
| 8 | `source` | String | Yes | `admissions_helpdesk`, `contact_page`, `programs_modal` |
| 9 | `assignedCounselor`| String | No | `cognitoId` of counselor assigned |
| 10 | `status` | String | Yes | Default `new`. Values: `new`, `contacted`, `converted`, `closed` |
| 11 | `createdAt` | Number | Yes | Epoch timestamp |

---

### 4.4 Table: `college_placements_{stage}`
**Purpose:** Manages corporate recruiter partners, campus placement drive scheduling, and student job offers.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `recruiterId` | String |

| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Which college campus |
| 2 | `recruiterId` | String | Yes (SK) | Unique Recruiter / Company UUID |
| 3 | `organizationName` | String | Yes | Company name (e.g. `Google`, `TCS`, `Infosys`) |
| 4 | `category` | String | Yes | `Tech Giants`, `Consulting & IT`, `Core`, `FinTech` |
| 5 | `contactPerson` | String | Yes | HR contact name |
| 6 | `contactEmail` | String | Yes | Corporate email |
| 7 | `hiringRoles` | List<String> | No | Target job titles |
| 8 | `ctcRange` | String | No | e.g. `₹8.5 LPA - ₹18.0 LPA` |
| 9 | `driveStatus` | String | Yes | Default `inquiry`. Values: `inquiry`, `scheduled`, `completed` |
| 10 | `totalOffers` | Number | No | Total job offers issued |
| 11 | `createdAt` | Number | Yes | Epoch timestamp |

---

### 4.5 Table: `college_security_logs_{stage}`
**Purpose:** Digital gate passes, visitor check-in/check-out tracking, vehicle entry logs, and campus security audits.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `passId` | String |

| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Which college campus |
| 2 | `passId` | String | Yes (SK) | Unique Pass ID (e.g. `SEC-PASS-9821`) |
| 3 | `visitorName` | String | Yes | Visitor full name |
| 4 | `visitorPhone` | String | Yes | Contact phone number |
| 5 | `purpose` | String | Yes | `Admission Counseling`, `Official Meeting`, `Vendor Delivery` |
| 6 | `personToMeet` | String | Yes | Faculty or department name |
| 7 | `vehicleNumber` | String | No | Vehicle registration number |
| 8 | `checkInTime` | Number | Yes | Epoch timestamp of entry |
| 9 | `checkOutTime` | Number | No | Epoch timestamp of exit |
| 10 | `issuedByGuardId` | String | Yes | `cognitoId` of security guard at gate |
| 11 | `status` | String | Yes | Default `inside_campus`. Values: `inside_campus`, `checked_out` |

---

### 4.6 Table: `college_notices_{stage}`
**Purpose:** Official Gazette notices, exam date-sheets, circulars, and homepage ticker announcements.

| Key Type | Attribute | Type |
| :--- | :--- | :--- |
| **Partition Key (PK)** | `institutionId` | String |
| **Sort Key (SK)** | `noticeId` | String |

| # | Attribute | Type | Required | Description |
| :---: | :--- | :--- | :---: | :--- |
| 1 | `institutionId` | String | Yes (PK) | Which college campus |
| 2 | `noticeId` | String | Yes (SK) | Unique notice code (e.g. `NOT-2026-BPUT-041`) |
| 3 | `title` | String | Yes | Notice headline |
| 4 | `category` | String | Yes | `examination`, `academics`, `placements`, `events`, `ticker` |
| 5 | `summary` | String | Yes | Brief description |
| 6 | `attachmentUrl` | String | No | S3 URL to official gazette PDF |
| 7 | `isUrgentTicker` | Boolean | Yes | Flag if displayed on top announcement ticker |
| 8 | `publishedBy` | String | Yes | `cognitoId` of Registrar or Exam Controller |
| 9 | `publishedAt` | Number | Yes | Epoch timestamp |

---

## 5. API Specifications

> [!IMPORTANT]
> `institutionId` is always extracted from the Cognito JWT token (`custom:institutionId`) — it is never passed in the request body.  
> All timestamps are stored as epoch numbers. All IDs are auto-generated UUIDs.

---

### 5.1 Auth / Login API
| # | API Name | Method | Endpoint | Table Used |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `get-userData` | `POST` | `/api/auth/login` | `college_user_profile` |

#### `POST /api/auth/login — get-userData`
User logs in with Cognito credentials. After successful Cognito authentication, the API fetches the user profile from DynamoDB and returns all user details plus `userType`.
- **Flow:**
  1. Call Cognito `AdminInitiateAuth` to validate credentials.
  2. Decode the JWT to extract `cognitoId` and `institutionId`.
  3. Query `college_user_profile` where `PK = institutionId` and `SK = cognitoId`.
  4. Return the user profile data plus the session tokens.

---

### 5.2 User Profile & Staff Management APIs
| # | API Name | Method | Endpoint | Table Used |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `create-profile` | `POST` | `/api/users` | `college_user_profile` + Cognito |
| 2 | `update-profile` | `PUT` | `/api/users/{cognitoId}` | `college_user_profile` |
| 3 | `delete-profile` | `DELETE`| `/api/users/{cognitoId}` | `college_user_profile` + Cognito |
| 4 | `get-profile` | `GET` | `/api/users/{cognitoId}` | `college_user_profile` |
| 5 | `get-all-profile` | `GET` | `/api/users?userType=student` | `college_user_profile` |

---

### 5.3 Admissions APIs
| # | API Name | Method | Endpoint | Table Used |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `create-application` | `POST` | `/api/admissions/apply` | `college_admissions` |
| 2 | `update-application` | `PUT` | `/api/admissions/{applicationId}` | `college_admissions` |
| 3 | `list-applications` | `GET` | `/api/admissions?status=applied` | `college_admissions` |
| 4 | `get-application` | `GET` | `/api/admissions/{applicationId}` | `college_admissions` |

#### `POST /api/admissions/apply — create-application`
Candidate submits a direct admission application.
- **Flow:**
  1. Generate unique `applicationId` (e.g. `TAT-2026-APP-8941`).
  2. Set `status = "applied"` and `createdAt = Date.now()`.
  3. Store the application in `college_admissions` table.
  4. Trigger Amazon SES acknowledgment email to candidate.
  5. Return `applicationId` and confirmation message.

---

### 5.4 Inquiry & Helpdesk APIs
| # | API Name | Method | Endpoint | Table Used |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `create-inquiry` | `POST` | `/api/inquiries` | `college_inquiries` |
| 2 | `update-inquiry` | `PUT` | `/api/inquiries/{inquiryId}` | `college_inquiries` |
| 3 | `list-inquiries` | `GET` | `/api/inquiries?status=new` | `college_inquiries` |
| 4 | `get-inquiry` | `GET` | `/api/inquiries/{inquiryId}` | `college_inquiries` |

---

### 5.5 Corporate Placements APIs
| # | API Name | Method | Endpoint | Table Used |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `create-recruiter` | `POST` | `/api/placements/recruiters` | `college_placements` |
| 2 | `update-recruiter` | `PUT` | `/api/placements/recruiters/{recruiterId}` | `college_placements` |
| 3 | `list-recruiters` | `GET` | `/api/placements/recruiters` | `college_placements` |
| 4 | `get-recruiter` | `GET` | `/api/placements/recruiters/{recruiterId}` | `college_placements` |

---

### 5.6 Campus Security & Gate Pass APIs
| # | API Name | Method | Endpoint | Table Used |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `create-gatepass` | `POST` | `/api/security/gatepass` | `college_security_logs` |
| 2 | `checkout-gatepass` | `PUT` | `/api/security/gatepass/{passId}/checkout` | `college_security_logs` |
| 3 | `get-gatepass` | `GET` | `/api/security/gatepass/{passId}` | `college_security_logs` |
| 4 | `list-active-visitors` | `GET` | `/api/security/active-visitors` | `college_security_logs` |

---

### 5.7 Official Gazette & Notice APIs
| # | API Name | Method | Endpoint | Table Used |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `publish-notice` | `POST` | `/api/notices` | `college_notices` |
| 2 | `update-notice` | `PUT` | `/api/notices/{noticeId}` | `college_notices` |
| 3 | `delete-notice` | `DELETE`| `/api/notices/{noticeId}` | `college_notices` |
| 4 | `list-notices` | `GET` | `/api/notices?category=examination` | `college_notices` |

---

### 5.8 S3 Document Uploads API
| # | API Name | Method | Endpoint | Storage |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `get-upload-url` | `POST` | `/api/uploads/presigned-url` | Amazon S3 |

---

## 6. Flow Diagrams

### 6.1 Complete Admission Application Lifecycle
```
 [Candidate Submits Online Form]
            │
            ▼ (POST /api/admissions/apply)
 [Status: applied] ──► [SES Email Confirmation Sent]
            │
            ▼ (POST /api/uploads/presigned-url)
 [Documents Uploaded (10th/12th/JEE)] ──► [Status: documents_pending]
            │
            ▼ (PUT /api/admissions/{id} by Faculty)
 [Admission Committee Audit] ──► [Status: under_review]
            │
            ▼
    [Eligible?]
    ├── Yes ──► [Status: offer_issued] ──► [Candidate Clears Admission Fee] ──► [Status: enrolled]
    └── No  ──► [Status: rejected]
```

### 6.2 Security Gate Pass Flow
```
 [Visitor Arrives at Campus Gate]
            │
            ▼ (POST /api/security/gatepass)
 [Guard Inputs Name, Phone, Vehicle, Person to Meet]
            │
            ▼
 [Pass Generated: Status inside_campus] ──► [SMS QR Token to Visitor]
            │
            ▼ (Visitor Finishes Meeting & Exits)
 [Guard Scans QR / Enters Pass Code] ──► (PUT /api/security/gatepass/{id}/checkout)
            │
            ▼
 [Status: checked_out with Exit Timestamp]
```

---

## 7. Status Lifecycle Reference

### Admission Application Status Values
| Status | Phase | Meaning |
| :--- | :--- | :--- |
| `applied` | Submission | Candidate submitted online form |
| `documents_pending` | Verification | Awaiting marksheet/certificate uploads |
| `under_review` | Academic Audit | Admission committee inspecting eligibility & rank |
| `offer_issued` | Offer | Provisional admission letter issued |
| `fee_paid` | Finance | Admission registration fee cleared |
| `enrolled` | Completed | Student converted into enrolled college record with roll number |
| `rejected` | Terminal | Eligibility criteria not met |

### Security Gate Pass Status Values
| Status | Meaning |
| :--- | :--- |
| `inside_campus` | Checked in at security gate; visitor currently on campus grounds |
| `checked_out` | Visitor has left through the security gate; departure logged |
| `flagged_security`| Overstayed visiting hours or security alert flagged |

---

## 8. Quick Reference: All APIs at a Glance

| # | API Name | Method | Endpoint | DynamoDB Table |
| :---: | :--- | :---: | :--- | :--- |
| 1 | `get-userData` | `POST` | `/api/auth/login` | `college_user_profile` |
| 2 | `create-profile` | `POST` | `/api/users` | `college_user_profile` + Cognito |
| 3 | `update-profile` | `PUT` | `/api/users/{cognitoId}` | `college_user_profile` |
| 4 | `delete-profile` | `DELETE`| `/api/users/{cognitoId}` | `college_user_profile` + Cognito |
| 5 | `get-profile` | `GET` | `/api/users/{cognitoId}` | `college_user_profile` |
| 6 | `get-all-profile` | `GET` | `/api/users?userType=...` | `college_user_profile` |
| 7 | `create-application`| `POST` | `/api/admissions/apply` | `college_admissions` |
| 8 | `update-application`| `PUT` | `/api/admissions/{applicationId}` | `college_admissions` |
| 9 | `list-applications` | `GET` | `/api/admissions?status=...` | `college_admissions` |
| 10 | `get-application` | `GET` | `/api/admissions/{applicationId}` | `college_admissions` |
| 11 | `create-inquiry` | `POST` | `/api/inquiries` | `college_inquiries` |
| 12 | `update-inquiry` | `PUT` | `/api/inquiries/{inquiryId}` | `college_inquiries` |
| 13 | `list-inquiries` | `GET` | `/api/inquiries?status=...` | `college_inquiries` |
| 14 | `get-inquiry` | `GET` | `/api/inquiries/{inquiryId}` | `college_inquiries` |
| 15 | `create-recruiter` | `POST` | `/api/placements/recruiters` | `college_placements` |
| 16 | `update-recruiter` | `PUT` | `/api/placements/recruiters/{recruiterId}`| `college_placements` |
| 17 | `list-recruiters` | `GET` | `/api/placements/recruiters` | `college_placements` |
| 18 | `create-gatepass` | `POST` | `/api/security/gatepass` | `college_security_logs` |
| 19 | `checkout-gatepass`| `PUT` | `/api/security/gatepass/{passId}/checkout`| `college_security_logs` |
| 20 | `list-active-visitors`| `GET`| `/api/security/active-visitors` | `college_security_logs` |
| 21 | `publish-notice` | `POST` | `/api/notices` | `college_notices` |
| 22 | `update-notice` | `PUT` | `/api/notices/{noticeId}` | `college_notices` |
| 23 | `delete-notice` | `DELETE`| `/api/notices/{noticeId}` | `college_notices` |
| 24 | `list-notices` | `GET` | `/api/notices?category=...` | `college_notices` |
| 25 | `get-upload-url` | `POST` | `/api/uploads/presigned-url` | Amazon S3 |
| 26 | `get-college-config`| `GET` | `/api/institution/config` | `college_config` |
| 27 | `update-college-config`| `PUT`| `/api/institution/config` | `college_config` |

---

## 9. Where to Start Building

### Suggested Build Order
1. Set up the Cognito user pool and create the 6 DynamoDB tables.
2. Build the auth and user profile APIs first (`login`, `create-profile`).
3. Build the public admissions and inquiries APIs (`apply`, `inquiries`).
4. Build the S3 document upload pre-signed URL handler.
5. Build the campus gate security pass APIs.
6. Build the official gazette notices and ticker APIs.
7. Connect the frontend forms and ERP tables to the live endpoints.
