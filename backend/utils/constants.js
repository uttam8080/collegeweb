// serverless/utils/constants.js
// Global constants for TEKKZY College of Technology Backend

module.exports = {
  TABLES: {
    USER_PROFILE: process.env.COLLEGE_USER_TABLE_NAME || 'college_user_profile_dev',
    ADMISSIONS: process.env.COLLEGE_ADMISSIONS_TABLE_NAME || 'college_admissions_dev',
    INQUIRIES: process.env.COLLEGE_INQUIRIES_TABLE_NAME || 'college_inquiries_dev',
    PLACEMENTS: process.env.COLLEGE_PLACEMENTS_TABLE_NAME || 'college_placements_dev',
    SECURITY_LOGS: process.env.COLLEGE_SECURITY_TABLE_NAME || 'college_security_logs_dev',
    NOTICES: process.env.COLLEGE_NOTICES_TABLE_NAME || 'college_notices_dev',
    CONFIG: process.env.COLLEGE_CONFIG_TABLE_NAME || 'college_config_variable_dev',
  },

  USER_TYPES: [
    'admin',
    'teacher',
    'student',
    'parent',
    'accountant',
    'exam_controller',
    'security',
    'recruiter'
  ],

  ADMISSION_STATUSES: [
    'applied',
    'documents_pending',
    'under_review',
    'offer_issued',
    'fee_paid',
    'enrolled',
    'rejected'
  ],

  INQUIRY_STATUSES: [
    'new',
    'contacted',
    'counseled',
    'converted',
    'closed'
  ],

  SECURITY_STATUSES: [
    'pass_generated',
    'inside_campus',
    'checked_out',
    'flagged_security'
  ],

  NOTICE_CATEGORIES: [
    'examination',
    'academics',
    'placements',
    'events',
    'ticker'
  ],

  DEFAULT_INSTITUTION_ID: 'TAT_MAIN_CAMPUS',
  DEFAULT_SESSION: '2026-27'
};
