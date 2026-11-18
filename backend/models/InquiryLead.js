// serverless/models/InquiryLead.js
// DynamoDB Data Model and CRUD helpers for college_inquiries

const db = require('../utils/db');
const validator = require('../utils/validator');
const helpers = require('../utils/helpers');
const constants = require('../utils/constants');

const tableName = constants.TABLES.INQUIRIES;

const schema = {
  institutionId: { required: false, type: 'string' },
  name: { required: true, type: 'string' },
  email: { required: true, type: 'string' },
  phone: { required: true, type: 'string' },
  message: { required: true, type: 'string' }
};

const create = async (institutionId, data) => {
  const fullData = { ...data, institutionId };
  const errors = validator.validate(fullData, schema);
  if (errors) throw new Error(`Validation failed: ${errors.join(', ')}`);

  const now = helpers.getEpoch();
  const inquiryId = data.inquiryId || helpers.generateUUID('INQ');

  const item = {
    institutionId,
    inquiryId,
    ...fullData,
    status: fullData.status || 'new',
    createdAt: data.createdAt || now,
    updatedAt: now
  };

  await db.put(tableName, item);
  return item;
};

const get = async (institutionId, inquiryId) => {
  const res = await db.get(tableName, { institutionId, inquiryId });
  return res && res.Item ? res.Item : null;
};

const update = async (institutionId, inquiryId, updateData) => {
  const existing = await get(institutionId, inquiryId);
  if (!existing) return null;

  const now = helpers.getEpoch();
  const updatedItem = {
    ...existing,
    ...updateData,
    institutionId,
    inquiryId,
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
