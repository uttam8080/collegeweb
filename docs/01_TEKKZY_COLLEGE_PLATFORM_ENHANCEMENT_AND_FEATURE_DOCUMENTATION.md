# TEKKZY COLLEGE OF TECHNOLOGY — SPS
# School & Campus Management ERP
## Platform Enhancement & Feature Documentation
### New Dashboard, Modules & Functionality Overview

**Version:** 2.0  
**Prepared for:** Product & Engineering Review  
**Date:** November 2026  
**Institution:** TEKKZY College of Technology (TAT) — SPS  

---

## 1. Overview

TEKKZY College SPS is being enhanced into a complete, next-generation College & Campus Management ERP. The upgrade modernizes the visual design of the platform and consolidates every day-to-day academic and campus operation — admissions, student lifecycle, attendance, fee management, examinations & results, timetable, hostel, library, placements, campus security, transport, and multi-channel communication — into a single, responsive dashboard.

This document summarizes the new dashboard design and describes, at a functional level, the core modules that make up the enhanced platform.

### The goal of this release is threefold:
1. **Deliver a clean, modern, fully responsive interface** that works consistently across desktop workstations, tablets, and mobile devices with dark/light themes.
2. **Bring every operational module** (academic, financial, campus security, corporate placement drives, hostel, transport, faculty management) into one connected system with strict role-based access control (RBAC).
3. **Automate recurring administrative work** — automated fee collection reminders, real-time gate pass issuance, attendance tracking, exam score computation, and reporting — to reduce manual effort for faculty and staff.

---

## 2. New Dashboard Design

The redesigned dashboard gives administrators, deans, and trustees a single-glance summary of the institution, followed by fast access to every academic and campus module through a responsive left-hand navigation panel.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TAT LOGO] TEKKZY College SPS   │ [Q Search anywhere... (Ctrl+K)]  [🎓 SESSION 2026-27]  [☀️/🌙]  [🔔 (3)] [AD Profile] │
├─────────────────────────────────┼───────────────────────────────────────────────────────────────────────────────┤
│ 📊 Dashboard                    │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│ 🎓 Admissions & Enrollment      │  │TOTAL STUDENTS│  │ TOTAL STAFF  │  │   FEE TASKS  │  │TOTAL COLLECT │  │PENDING FEES│ │
│ 👨‍🎓 Students Directory          │  │    3,420     │  │     248      │  │ 12 Pending   │  │ ₹1,84,50,000 │  │ ₹38,20,000 │ │
│ 📅 Attendance Management        │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘ │
│ 💳 Fees & Online Payments       │                                                                               │
│ 📝 Exams & TCT Results         │  ┌──────────────────────────────┐  ┌─────────────────────────────┐  ┌───────────────┐ │
│ 🏛️ Academic Units & Courses     │  │ Fees Collection Breakdown    │  │ Income & Expense Overview   │  │ Quick Access  │ │
│ 💼 Placements & Recruiters      │  │ Today: ₹4,20,000             │  │ Net Surplus: ₹18.4 Lakhs    │  │ [New Student] │ │
│ 🛡️ Campus Security & Gate Pass  │  │ Cash: 15% | UPI: 65% | Bank  │  │ Income vs Operating Expense │  │ [Collect Fee] │ │
│ 📚 Central Digital Library      │  └──────────────────────────────┘  └─────────────────────────────┘  │ [Gate Pass]   │ │
│ 🚌 Transport & Fleet Tracking   │                                                                     │ [Post Notice] │ │
│ 🏢 Hostel & Mess Management     │  ┌──────────────────────────────┐  ┌─────────────────────────────┐  └───────────────┘ │
│ 📢 Official Gazette & Notices   │  │ Live Student Attendance      │  │ Live Staff Attendance       │  ┌───────────────┐ │
│ 💬 Multi-Channel Communication  │  │ Present: 3,110 | Absent: 310 │  │ Present: 236 | On Leave: 12 │  │ Recent Alerts │ │
│ ⚙️ System Settings & RBAC       │  └──────────────────────────────┘  └─────────────────────────────┘  │ Fee Paid 2m ago│ │
└─────────────────────────────────┴─────────────────────────────────────────────────────────────────────┴───────────────┘
```

### 2.1 Layout & Navigation
- **Left Navigation Sidebar**: Collapsible, icon-led menu listing every institution module (Admissions, Students, Attendance, Fee Management, Exam & Results, Academic Units, Placements, Security Gate, Library, Transport, Hostel, Communication, Settings). Fully responsive — collapses to icon-only mode on smaller screens and adapts to mobile slide-over drawers.
- **Top Navbar**: Global search (`Ctrl + K`), active academic session selector (e.g. `SESSION 2026-27`), live date/time display, pause/resume session toggle, notification bell with unread badge counter, and logged-in administrator/faculty profile dropdown.
- **Dark Mode**: A one-click toggle in the navbar seamlessly shifts the interface between a high-contrast dark theme (navy/slate `#0E1726`) and a crisp warm canvas light theme (`#FAF9F5`).
- **Quick Access Panel**: Shortcut tiles for frequent daily operations — *New Admission*, *Collect Fee*, *Issue Gate Pass*, *Record Attendance*, *Publish Gazette Notice*.

### 2.2 Overview Summary Cards
The top row of the dashboard highlights vital real-time institutional metrics:
- **Total Students**: Total enrolled students across B.Tech, M.Tech, Polytechnic, and Diploma programs.
- **Total Staff & Faculty**: Ratio of teaching faculty to non-teaching technical staff.
- **Fee Tasks**: Defaulters flagged, reconciliations pending, and scholarship disbursements awaiting sign-off.
- **Total Collection**: Net fee collections for the current active semester/session.
- **Total Fees Pending**: Outstanding institutional receivables with student count.

### 2.3 Collection & Live Monitoring Widgets
- **Fees Collection Overview**: Multi-mode breakdown of incoming payments: UPI, NetBanking/NEFT, Razorpay, Cash counter, and Demand Drafts.
- **Income & Expense Overview**: Operational expenditure vs institutional income with net balance drill-down.
- **Live Attendance Status**: Real-time departmental metrics (Computer Science, Electrical, Mechanical, Civil, Polytechnic) with one-click "Mark Attendance" triggers.
- **Live Security Gate Activity**: Active visitors inside campus, vehicles logged, and pending gate pass verifications.
- **Recent Activity & Notifications**: Live audit trail of student admissions, payment confirmations, and published circulars.

---

## 3. Module-wise Functionality

Every module is accessible from the responsive sidebar and maintains strict UI consistency. Access permissions are regulated by the RBAC matrix (see Document 02).

---

### 3.1 Student Management & Lifecycle
- **Add Student**: Multi-row bulk enrollment or single detailed admission onboarding with photo, blood group, emergency contacts, quota (JEE Main, OJEE, Management, TFW), and allotted academic unit.
- **Student Directory**: High-performance searchable, filterable roster with quick actions (view profile, edit details, issue bonafide certificate, suspend, graduate).
- **Batch Promotion**: Bulk end-of-semester promotion engine moving students to the next academic semester/year with carry-forward backlog checks.
- **Comprehensive Profile**: 360-degree view containing personal data, enrolled subjects, hostel room allotment, transport bus route, fee payment ledger, and academic CGPA history.

---

### 3.2 Attendance Management
- **Department & Section Tracking**: Class-wise and subject-wise attendance logging for daily lectures and practical laboratory sessions.
- **Biometric & Face Recognition Integration**: Hardware-assisted capture at classroom doors alongside manual faculty override.
- **Live Percentage Computing**: Automated tracking of students falling below statutory minimums (e.g. < 75% BPUT compliance).
- **Downloadable Attendance Reports**: Instant export in PDF / Excel by date range, department, semester, or individual roll number.

---

### 3.3 Fee Management & Online Collection
- **Configurable Fee Structures**: Customizable fee slabs by school, program, quota, and semester (Tuition Fee, Development Fee, Hostel Fee, Transport Fee, Lab Charges).
- **Defaulter Tracking & Aging Reports**: Flags overdue balances with dynamic interest/penalty configuration and one-click SMS/WhatsApp reminders.
- **Multi-Channel Reconciliation**: Automated ledger entries for Online Razorpay payments, UPI QR codes, POS card machines, Cash desk, and Bank challans.
- **Student / Parent Payment Portal**: Self-service portal where students log in to view outstanding balances, pay via payment gateway, and download official fee receipts.

---

### 3.4 Academics, Homework & Course Syllabi
- **Curriculum & Lesson Planning**: Faculty post syllabus schedules, lecture notes, textbook references, and laboratory assignments.
- **Digital Homework Submissions**: Students submit assignments online with deadline timestamps and plagiarism checks.
- **Parent Visibility**: Parents inspect daily homework assignments, faculty remarks, and lesson completion status from their dedicated portal.

---

### 3.5 Exam & Result System (BPUT / Autonomous)
- **Exam Schedule & Admit Card Generator**: Automated timetable creation with roll-number-based hall ticket and admit card issuance with verifiable QR codes.
- **Marks Entry & Moderation**: Secure marks entry portal for internal assessments, mid-terms, and laboratory vivas.
- **SGPA & CGPA Computation**: Automated grade calculations according to university credit rules.
- **Digital Report Cards**: Instant publishing of semester marksheets with secure PDF download for students and parents.

---

### 3.6 Class & Subject Management
- **School & Department Architecture**: Management of School of Engineering, School of Polytechnic, School of Management, and Centres of Excellence.
- **Subject Allotment**: Mapping theory and laboratory subjects to specific faculty members and sections.
- **Smart Timetable Generator**: Conflict-free scheduling engine preventing room and faculty overlaps across lab facilities and lecture halls.

---

### 3.7 Staff & Payroll
- **Faculty & Employee Directory**: Comprehensive staff database tracking qualifications, research publications, DSIR projects, and designations.
- **Biometric Punch & Leave Management**: Integrated biometric attendance with automated casual, earned, and medical leave tracking.
- **Payroll & Pay-Slip Generation**: Automated salary generation incorporating allowances, PF, ESIC, professional tax deductions, and one-click salary slip downloads.

---

### 3.8 Accounts, GST & Expenses
- **Double-Entry Institutional Ledger**: Daily cashbooks, journal entries, balance sheets, and profit/loss statements.
- **GST Billing & Compliance**: Dedicated invoice generation with configurable 5% / 18% GST rates for third-party services, consulting, and facility rentals.
- **Vendor Expense Tracking**: Processing vendor purchase orders, laboratory equipment requisitions, and maintenance expenses.

---

### 3.9 Central Digital Library Management
- **Barcode & RFID Book Cataloging**: Fast issue and return workflows using barcode scanners.
- **Book Inventory Management**: Live inventory tracking across engineering, scientific research, and humanities departments.
- **Overdue Management**: Automated fine computation with digital reminders sent to delinquent borrowers.

---

### 3.10 Transport & Fleet Tracking
- **Fleet & Route Roster**: Management of college buses, registered drivers, licenses, route stops, and pickup timings across Bhubaneswar and twin cities.
- **Live GPS Tracking**: Real-time geolocation tracking of buses accessible to parents and students through mobile devices.
- **Transport Billing**: Route-based transport fee computation automatically linked to the student fee ledger.

---

### 3.11 Hostel & Mess Management
- **Room Allotment & Occupancy Matrix**: Visual bed-by-bed matrix across boys' and girls' hostel blocks.
- **Hostel Attendance & Night Curfew Register**: Digital roll-call check-in with gate alerts for missing students.
- **Mess Menu & Meal Feedback**: Weekly dietary schedule management and student food quality reviews.

---

### 3.12 Campus Security & Gate Pass Management
- **Digital Visitor Passes**: Instant creation of visitor passes with photo capture, visitor phone verification, and host approval.
- **Student Out-Pass Workflow**: Hostel students apply for weekend or day out-passes; automated approval from Hostel Warden triggers a QR pass for the security gate.
- **Vehicle Entry Logging**: Automated vehicle plate logging at main college gates with entry/exit timestamps.

---

### 3.13 Official Gazette, Notices & Multi-Channel Communication
- **Official Gazette Notice Board**: Multi-category circular publication (Examinations, Placements, Campus Events, Holidays) with PDF attachments.
- **Live Website Announcement Ticker**: Immediate synchronization with the public college website's top ticker banner.
- **SMS, WhatsApp & Email Broadcasts**: Transactional and informational alerts delivered directly via AWS SES, WhatsApp Business API, and SMS gateways.

---

### 3.14 System Settings, Templates & Access Control
- **Academic Session Configuration**: Create and switch active sessions, configure admission open/close dates, and manage grading schemes.
- **Document Design Studio**: Customizable HTML/CSS template engine for student ID cards, transfer certificates, character certificates, and fee receipts.
- **Role-Based Access Control (RBAC)**: Fine-grained toggle matrix controlling exact view/edit/delete/approve capabilities for every staff designation.

---

## 4. Summary

Together, the redesigned dashboard and the fourteen integrated modules transform TEKKZY College of Technology into a unified, digitally driven campus. Every operational workflow — from candidate admission and classroom attendance to campus gate security and corporate recruiter placement drives — is centralized within one responsive, secure platform.
