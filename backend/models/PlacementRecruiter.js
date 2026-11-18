// serverless/models/PlacementRecruiter.js
// DynamoDB Data Model and CRUD helpers for college_placements

const db = require('../utils/db');
const validator = require('../utils/validator');
const helpers = require('../utils/helpers');
const constants = require('../utils/constants');

const tableName = constants.TABLES.PLACEMENTS;

const schema = {
  institutionId: { required: false, type: 'string' },
  organizationName: { required: true, type: 'string' },
  contactPerson: { required: true, type: 'string' },
  contactEmail: { required: true, type: 'string' }
};

const create = async (institutionId, data) => {
  const fullData = { ...data, institutionId };
  const errors = validator.validate(fullData, schema);
  if (errors) throw new Error(`Validation failed: ${errors.join(', ')}`);

  const now = helpers.getEpoch();
  const recruiterId = data.recruiterId || helpers.generateUUID('REC');

  const item = {
    institutionId,
    recruiterId,
    ...fullData,
    driveStatus: fullData.driveStatus || 'inquiry',
    totalOffers: fullData.totalOffers || 0,
    createdAt: data.createdAt || now,
    updatedAt: now
  };

  await db.put(tableName, item);
  return item;
};

const get = async (institutionId, recruiterId) => {
  const res = await db.get(tableName, { institutionId, recruiterId });
  return res && res.Item ? res.Item : null;
};

const update = async (institutionId, recruiterId, updateData) => {
  const existing = await get(institutionId, recruiterId);
  if (!existing) return null;

  const now = helpers.getEpoch();
  const updatedItem = {
    ...existing,
    ...updateData,
    institutionId,
    recruiterId,
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

  if (filters.driveStatus) {
    params.FilterExpression = 'driveStatus = :dStatus';
    params.ExpressionAttributeValues[':dStatus'] = filters.driveStatus;
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
