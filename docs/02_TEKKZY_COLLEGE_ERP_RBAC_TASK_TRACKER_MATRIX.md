# TEKKZY COLLEGE OF TECHNOLOGY — SPS
# Role-Based Access Control (RBAC) & Task Tracker Matrix
## Permission Matrix Across All Institutional Roles & Modules

**Version:** 2.0  
**Adapted From:** School_ERP_V2_Task_Tracker Specification  
**Scope:** Public College Portal & Internal SPS ERP  

---

## 1. Role Definitions

| Role Code | Role Name | Description / Scope |
| :--- | :--- | :--- |
| **OWN** | **Owner / Trustee** | Central Board of Governance, overall institution owner with unrestricted super-admin privileges. |
| **ADM** | **Admin / Dean** | College Principal, Deans, Registrar, and Senior Academic Administration. |
| **ACC** | **Accountant** | Accounts Department, Cashier, Billing, Fee Collection, and Financial Ledger Audits. |
| **TCH** | **Teacher / Faculty** | Assistant / Associate Professors, Lecturers, and Laboratory Instructors. |
| **CLT** | **Class Teacher / HOD**| Heads of Departments, Section In-charges, and Proctorial mentors. |
| **EXC** | **Exam Controller** | Examination Cell, BPUT Nodal Officers, and Assessment Superintendents. |
| **REC** | **Receptionist** | Front-desk inquiry officers, Helpdesk operators, and Visitor liaison. |
| **LIB** | **Librarian** | Central Library staff, Cataloging, RFID/Barcode book issue and return. |
| **WRD** | **Hostel Warden** | Boys' and Girls' Hostel Superintendents, Room Allotment, Night Curfew & Mess supervisors. |
| **HOS** | **Hostel Staff** | Ground hostel caretakers, Mess staff, and Maintenance attendants. |
| **TRM** | **Transport Manager** | Fleet superintendent, Bus routes, GPS tracking, and Maintenance logs. |
| **DRV** | **Bus Driver / Staff**| College bus drivers, Conductors, and Vehicle attendants. |
| **PAR** | **Parent / Guardian** | Parents and legal guardians accessing student academic progress, dues, and bus tracking. |
| **STU** | **Student** | Enrolled undergraduate and diploma engineering students. |
| **SEC** | **Security Personnel**| Campus main gate security guards, vehicle inspection, and visitor pass validators. |
| **REC** | **Corporate Recruiter**| Company HRs, Talent Acquisition teams visiting for campus drives. |

---

## 2. Granular Permissions Matrix

> **Data Scope Legend:**  
> • **Full:** Create, View, Edit, Delete, Export, and Approve across all departments.  
> • **View:** Read-only access across the institution.  
> • **Own:** Read/Write only to records belonging to or assigned to the authenticated user.  
> • **Own Class / Dept:** Access restricted to students in their specific section, department, or hostel block.  
> • **—:** No access (hidden from navigation and blocked by API Gateway authorizer).

### Part A: Administrative, Academic & Student Management

| Module / Screen | Owner | Admin | Accountant | Teacher | Class Teacher / HOD | Exam Controller | Receptionist | Librarian |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dashboard** | Full | Full | Finance widgets | Own classes | Own department | Exam widgets | Front-desk widgets | Library widgets |
| **Students / Admission** | Full | Full | View | View own classes | Full (Dept) | View | Add / Edit (Inquiries) | View |
| **Attendance Management**| Full | Full | — | Mark own classes | Mark own classes / Dept | — | — | — |
| **Class / Timetable** | Full | Full | — | View own | Own department | View | View | — |
| **Fees & Payments** | Full | Full | Full | — | View class dues | — | Collect / View | — |
| **Exam & Results** | Full | Full | — | Upload marks (allowed) | Upload + view class | Full | — | — |
| **Certificates & ID Cards**| Full | Full | View | — | Request | View | Issue (allowed) | — |
| **Digital Library** | Full | Full | View | View | View | — | — | Full |
| **Transport & Fleet** | Full | Full | Fees / Expense | — | — | — | — | — |
| **Hostel & Mess** | Full | Full | Fees / Expense | — | — | — | — | — |
| **Staff & Payroll** | Full | Full | Full | Own payslip | Own payslip | — | — | — |
| **Accounts & GST** | Full | Full | Full | — | — | — | — | — |
| **Communication / Alerts**| Full | Full | Fee reminders | — | Class notices | — | Send (allowed) | — |
| **Notices & Gazette** | Full | Full | View | Post homework / notes | Post department notices | Post Exam Circulars | View | View |
| **Settings & Roles** | Full | Limited | — | — | — | — | — | — |

---

### Part B: Campus Operations, Students, Parents & External Partners

| Module / Screen | Hostel Warden | Hostel Staff | Transport Manager | Bus Driver / Staff | Parent / Guardian | Student | Security Guard | Corporate Recruiter |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dashboard** | Hostel widgets | Hostel widgets | Transport widgets | Own bus | Own child | Own profile | Gate widgets | Placement drive |
| **Students / Admission** | View hostel students | — | View route students | — | Own child | Own | Verify ID / Pass | View candidate profiles |
| **Attendance Management**| Hostel roll call | Roll call | — | Own check-in + bus students | View child | View own | Gate in/out punch | — |
| **Class / Timetable** | — | — | — | — | View | View | — | — |
| **Fees & Payments** | View hostel dues | — | — | — | Pay + history | Pay + history | — | — |
| **Exam & Results** | — | — | — | — | Result + admit card | Result + admit card | — | View test scores |
| **Certificates & ID Cards**| — | — | — | — | Download own | Download own | Verify student badge | — |
| **Digital Library** | — | — | — | — | Own issued + renew | Own issued + renew | — | — |
| **Transport & Fleet** | — | — | Full | Own trips | Live bus location | Live bus location | Vehicle gate pass | — |
| **Hostel & Mess** | Full | Roll call / Register | — | — | Child hostel info | Own room | Visitor pass | — |
| **Staff & Payroll** | — | — | Own expenses | Own payslip | — | — | — | — |
| **Accounts & GST** | — | — | — | — | — | — | — | — |
| **Communication / Alerts**| View | View | View | View | Receive alerts | Receive alerts | Emergency broadcast | Inquiries |
| **Notices & Gazette** | View | View | View | View | View | View | Gate notices | Drive notices |
| **Settings & Roles** | — | — | — | — | — | — | — | — |

---

## 3. Implementation in AWS Lambda Middleware

Every Lambda handler validates the requester's role using claims embedded inside the Amazon Cognito JWT:

```javascript
// Example: RBAC Authorization Guard inside Lambda middleware
const checkPermission = (userType, module, action) => {
    const rolePermissions = RBAC_MATRIX[userType];
    if (!rolePermissions) return false;
    
    const allowed = rolePermissions[module];
    if (allowed === 'Full') return true;
    if (allowed === action) return true;
    if (allowed === 'View' && action === 'read') return true;
    return false;
};
```
