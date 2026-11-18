// serverless/models/UserProfile.js
// DynamoDB Data Model and CRUD helpers for college_user_profile

const db = require('../utils/db');
const validator = require('../utils/validator');
const constants = require('../utils/constants');

const tableName = constants.TABLES.USER_PROFILE;

const schema = {
  institutionId: { required: false, type: 'string' },
  cognitoId: { required: true, type: 'string' },
  fullName: { required: true, type: 'string' },
  userType: {
    required: true,
    type: 'string',
    validate: (v) => (constants.USER_TYPES.includes(v) ? null : `must be one of: ${constants.USER_TYPES.join(', ')}`)
  },
  phoneNumber: { required: true, type: 'string' },
  email: { required: false, type: 'string' }
};

const create = async (institutionId, data) => {
  const fullData = { ...data, institutionId };
  const errors = validator.validate(fullData, schema);
  if (errors) throw new Error(`Validation failed: ${errors.join(', ')}`);

  const now = Math.floor(Date.now() / 1000);
  const item = {
    institutionId,
    ...fullData,
    status: fullData.status || 'active',
    createdAt: data.createdAt || now,
    updatedAt: now
  };

  await db.put(tableName, item);
  return item;
};

const get = async (institutionId, cognitoId) => {
  const res = await db.get(tableName, { institutionId, cognitoId });
  return res && res.Item ? res.Item : null;
};

const update = async (institutionId, cognitoId, updateData) => {
  const existing = await get(institutionId, cognitoId);
  if (!existing) return null;

  const now = Math.floor(Date.now() / 1000);
  const updatedItem = {
    ...existing,
    ...updateData,
    institutionId,
    cognitoId,
    updatedAt: now
  };

  await db.put(tableName, updatedItem);
  return updatedItem;
};

const remove = async (institutionId, cognitoId) => {
  return db.delete(tableName, { institutionId, cognitoId });
};

const listByInstitution = async (institutionId, filters = {}) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'institutionId = :inst',
    ExpressionAttributeValues: {
      ':inst': institutionId
    }
  };

  if (filters.userType) {
    params.FilterExpression = 'userType = :uType';
    params.ExpressionAttributeValues[':uType'] = filters.userType;
  }

  const res = await db.query(params);
  return res && res.Items ? res.Items : [];
};

module.exports = {
  create,
  get,
  update,
  remove,
  listByInstitution
};
