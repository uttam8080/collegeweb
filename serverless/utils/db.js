// serverless/utils/db.js
// DynamoDB DocumentClient wrapper for TEKKZY College of Technology

const logger = require('./logger');

let docClient;

const getDocClient = () => {
  if (!docClient) {
    let AWS;
    try {
      AWS = require('aws-sdk');
    } catch {
      // In local environments without aws-sdk installed, mock or throw informative message
      logger.warn('aws-sdk is not installed locally; using in-memory or mock driver');
      return {
        put: () => ({ promise: async () => ({}) }),
        get: () => ({ promise: async () => ({}) }),
        query: () => ({ promise: async () => ({ Items: [] }) }),
        update: () => ({ promise: async () => ({}) }),
        delete: () => ({ promise: async () => ({}) }),
        scan: () => ({ promise: async () => ({ Items: [] }) }),
      };
    }

    const options = {
      region: process.env.AWS_REGION || process.env.REGION || 'ap-south-1',
      maxRetries: 3
    };

    if (process.env.IS_OFFLINE || process.env.DYNAMODB_LOCAL_ENDPOINT) {
      options.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT || 'http://localhost:8000';
      options.accessKeyId = 'localKey';
      options.secretAccessKey = 'localSecret';
    }

    docClient = new AWS.DynamoDB.DocumentClient(options);
  }
  return docClient;
};

module.exports = {
  put: async (tableName, item) => {
    logger.debug(`DynamoDB PUT into ${tableName}`, { item });
    return getDocClient().put({ TableName: tableName, Item: item }).promise();
  },

  get: async (tableName, key) => {
    logger.debug(`DynamoDB GET from ${tableName}`, { key });
    return getDocClient().get({ TableName: tableName, Key: key }).promise();
  },

  query: async (params) => {
    logger.debug(`DynamoDB QUERY on ${params.TableName}`, { params });
    return getDocClient().query(params).promise();
  },

  update: async (params) => {
    logger.debug(`DynamoDB UPDATE on ${params.TableName}`, { params });
    return getDocClient().update(params).promise();
  },

  delete: async (tableName, key) => {
    logger.debug(`DynamoDB DELETE from ${tableName}`, { key });
    return getDocClient().delete({ TableName: tableName, Key: key }).promise();
  },

  scan: async (params) => {
    logger.debug(`DynamoDB SCAN on ${params.TableName}`, { params });
    return getDocClient().scan(params).promise();
  }
};
