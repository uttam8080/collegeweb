// serverless/models/SecurityGatePass.js
// DynamoDB Data Model and CRUD helpers for college_security_logs

const db = require('../utils/db');
const validator = require('../utils/validator');
const helpers = require('../utils/helpers');
const constants = require('../utils/constants');

const tableName = constants.TABLES.SECURITY_LOGS;

const schema = {
  institutionId: { required: false, type: 'string' },
  visitorName: { required: true, type: 'string' },
  visitorPhone: { required: true, type: 'string' },
  purpose: { required: true, type: 'string' },
  personToMeet: { required: true, type: 'string' }
};

const create = async (institutionId, data) => {
  const fullData = { ...data, institutionId };
  const errors = validator.validate(fullData, schema);
  if (errors) throw new Error(`Validation failed: ${errors.join(', ')}`);

  const now = helpers.getEpoch();
  const passId = data.passId || helpers.generateUUID('SEC-PASS');

  const item = {
    institutionId,
    passId,
    ...fullData,
    checkInTime: data.checkInTime || now,
    status: fullData.status || 'inside_campus',
    createdAt: now
  };

  await db.put(tableName, item);
  return item;
};

const get = async (institutionId, passId) => {
  const res = await db.get(tableName, { institutionId, passId });
  return res && res.Item ? res.Item : null;
};

const checkout = async (institutionId, passId) => {
  const existing = await get(institutionId, passId);
  if (!existing) return null;

  const now = helpers.getEpoch();
  const updatedItem = {
    ...existing,
    checkOutTime: now,
    status: 'checked_out'
  };

  await db.put(tableName, updatedItem);
  return updatedItem;
};

const listActiveVisitors = async (institutionId) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'institutionId = :inst',
    FilterExpression: '#st = :statusVal',
    ExpressionAttributeNames: { '#st': 'status' },
    ExpressionAttributeValues: {
      ':inst': institutionId,
      ':statusVal': 'inside_campus'
    }
  };

  const res = await db.query(params);
  return res && res.Items ? res.Items : [];
};

module.exports = {
  create,
  get,
  checkout,
  listActiveVisitors
};
