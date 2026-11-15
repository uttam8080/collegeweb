// serverless/utils/helpers.js
// Standard API response formatters and utility helpers

const crypto = require('crypto');

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent,institutionId,institution',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE'
};

const buildResponse = (statusCode, body, customHeaders = {}) => {
  return {
    statusCode,
    headers: { ...defaultHeaders, ...customHeaders },
    body: JSON.stringify(body)
  };
};  

module.exports = {
  success: (data = {}, message = 'Success') => {
    return buildResponse(200, {
      success: true,
      message,
      data
    });
  },

  created: (data = {}, message = 'Resource created successfully') => {
    return buildResponse(201, {
      success: true,
      message,
      data
    });
  },

  badRequest: (message = 'Bad Request', errors = null) => {
    return buildResponse(400, {
      success: false,
      message,
      ...(errors ? { errors } : {})
    });
  },

  unauthorized: (message = 'Unauthorized') => {
    return buildResponse(401, {
      success: false,
      message
    });
  },

  forbidden: (message = 'Forbidden') => {
    return buildResponse(403, {
      success: false,
      message
    });
  },

  notFound: (message = 'Resource not found') => {
    return buildResponse(404, {
      success: false,
      message
    });
  },

  serverError: (message = 'Internal Server Error', error = null) => {
    return buildResponse(500, {
      success: false,
      message,
      ...(process.env.DEBUG === 'true' && error ? { details: error.message || error } : {})
    });
  },

  getEpoch: () => Math.floor(Date.now() / 1000),

  generateUUID: (prefix = '') => {
    const uuid = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
    return prefix ? `${prefix}-${uuid}` : uuid;
  }
};
