// serverless/models/GazetteNotice.js
// DynamoDB Data Model and CRUD helpers for college_notices

const db = require('../utils/db');
const validator = require('../utils/validator');
const helpers = require('../utils/helpers');
const constants = require('../utils/constants');

const tableName = constants.TABLES.NOTICES;

const schema = {
  institutionId: { required: false, type: 'string' },
  title: { required: true, type: 'string' },
  category: {
    required: true,
    type: 'string',
    validate: (v) => (constants.NOTICE_CATEGORIES.includes(v) ? null : `must be one of: ${constants.NOTICE_CATEGORIES.join(', ')}`)
  },
  summary: { required: true, type: 'string' }
};

const create = async (institutionId, data) => {
  const fullData = { ...data, institutionId };
  const errors = validator.validate(fullData, schema);
  if (errors) throw new Error(`Validation failed: ${errors.join(', ')}`);

  const now = helpers.getEpoch();
  const noticeId = data.noticeId || helpers.generateUUID('NOT');

  const item = {
    institutionId,
    noticeId,
    ...fullData,
    isUrgentTicker: Boolean(fullData.isUrgentTicker),
    publishedAt: data.publishedAt || now,
    createdAt: now
  };

  await db.put(tableName, item);
  return item;
};

const get = async (institutionId, noticeId) => {
  const res = await db.get(tableName, { institutionId, noticeId });
  return res && res.Item ? res.Item : null;
};

const remove = async (institutionId, noticeId) => {
  return db.delete(tableName, { institutionId, noticeId });
};

const listByInstitution = async (institutionId, filters = {}) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'institutionId = :inst',
    ExpressionAttributeValues: {
      ':inst': institutionId
    }
  };

  if (filters.category && filters.category !== 'all') {
    params.FilterExpression = 'category = :cat';
    params.ExpressionAttributeValues[':cat'] = filters.category;
  }

  const res = await db.query(params);
  return res && res.Items ? res.Items : [];
};

module.exports = {
  create,
  get,
  remove,
  listByInstitution
};
