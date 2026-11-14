// serverless/models/CollegeConfig.js
// DynamoDB Data Model and CRUD helpers for college_config_variable

const db = require('../utils/db');
const constants = require('../utils/constants');

const tableName = constants.TABLES.CONFIG;

/**
 * Fetch institution college profile (index = 0)
 */
const getCollegeProfile = async (institutionId) => {
  const res = await db.get(tableName, { institutionId, index: 0 });
  if (res && res.Item) return res.Item;

  // Default fallback profile for TEKKZY College of Technology
  return {
    institutionId,
    index: 0,
    collegeName: 'TEKKZY College of Technology',
    tagline: 'Advance Technology · Ethical Leadership · Autonomous Excellence',
    address: 'TAT Campus, Infocity Road, Patia, Bhubaneswar, Odisha 751024',
    contactEmail: 'admissions@tekkzy.edu.in',
    contactPhone: '+91 674 6633000',
    currentSession: constants.DEFAULT_SESSION,
    establishedYear: 2005
  };
};

/**
 * Save or update institution college profile (index = 0)
 */
const updateCollegeProfile = async (institutionId, profileData) => {
  const current = await getCollegeProfile(institutionId);
  const updated = {
    ...current,
    ...profileData,
    institutionId,
    index: 0,
    updatedAt: Math.floor(Date.now() / 1000)
  };

  await db.put(tableName, updated);
  return updated;
};

module.exports = {
  getCollegeProfile,
  updateCollegeProfile
};
