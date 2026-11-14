// serverless/models/AdmissionApplication.js
// DynamoDB Data Model and CRUD helpers for college_admissions

const db = require('../utils/db');
const validator = require('../utils/validator');
const helpers = require('../utils/helpers');
const constants = require('../utils/constants');

const tableName = constants.TABLES.ADMISSIONS;

const schema = {
  institutionId: { required: false, type: 'string' },
  applicantName: { required: true, type: 'string' },
  applicantEmail: { required: true, type: 'string' },
  applicantPhone: { required: true, type: 'string' },
  programName: { required: true, type: 'string' },
  qualifyingExam: { required: true, type: 'string' },
  examScore: { required: true, type: 'string' }
};

const create = async (institutionId, data) => {
  const fullData = { ...data, institutionId };
  const errors = validator.validate(fullData, schema);
  if (errors) throw new Error(`Validation failed: ${errors.join(', ')}`);

  const now = helpers.getEpoch();
  const applicationId = data.applicationId || helpers.generateUUID('TAT-APP');

  const item = {
    institutionId,
    applicationId,
    ...fullData,
    status: fullData.status || 'applied',
    documents: fullData.documents || [],
    createdAt: data.createdAt || now,
    updatedAt: now
  };

  await db.put(tableName, item);
  return item;
};

const get = async (institutionId, applicationId) => {
  const res = await db.get(tableName, { institutionId, applicationId });
  return res && res.Item ? res.Item : null;
};

const update = async (institutionId, applicationId, updateData) => {
  const existing = await get(institutionId, applicationId);
  if (!existing) return null;

  const now = helpers.getEpoch();
  const updatedItem = {
    ...existing,
    ...updateData,
    institutionId,
    applicationId,
    updatedAt: now
  };

  await db.put(tableName, updatedItem);
  return updatedItem;
};

const listByInstitution = async (institutionId, filters = {}) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'institutionId = :inst',
    ExpressionAttributeValues: {
      ':inst': institutionId
    }
  };

  if (filters.status) {
    params.FilterExpression = '#st = :statusVal';
    params.ExpressionAttributeNames = { '#st': 'status' };
    params.ExpressionAttributeValues[':statusVal'] = filters.status;
  }

  const res = await db.query(params);
  return res && res.Items ? res.Items : [];
};

module.exports = {
  create,
  get,
  update,
  listByInstitution
};
