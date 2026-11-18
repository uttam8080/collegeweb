// serverless/utils/middleware.js
// Custom Lambda middleware wrapper for TEKKZY College of Technology Backend

const helpers = require('./helpers');
const logger = require('./logger');
const constants = require('./constants');

/**
 * Decorates standard Lambda handlers with common middleware functionalities:
 * 1. Sets context requestId for structured logs correlation
 * 2. Parses stringified request JSON payloads
 * 3. Log incoming request signatures
 * 4. Gracefully catches unhandled exceptions and formats standard CORS responses
 */
const useMiddleware = (handler) => {
  return async (event, context = {}) => {
    // Correlate logger with AWS CloudWatch Request ID
    logger.setRequestId(context.awsRequestId || 'dev-local-req');

    logger.info(`Incoming Request: ${event.httpMethod || 'CLI'} ${event.path || '/'}`, {
      pathParameters: event.pathParameters,
      queryStringParameters: event.queryStringParameters,
    });

    // Parse JSON request body if present and not yet parsed
    if (event.body && typeof event.body === 'string') {
      try {
        const headers = event.headers || {};
        const contentType = headers['Content-Type'] || headers['content-type'] || '';
        if (
          contentType.includes('application/json') ||
          event.body.trim().startsWith('{') ||
          event.body.trim().startsWith('[')
        ) {
          event.body = JSON.parse(event.body);
        }
      } catch (err) {
        logger.error('Failed to parse request JSON payload', err);
        return helpers.badRequest('Invalid JSON request body');
      }
    }

    try {
      return await handler(event, context);
    } catch (err) {
      logger.error('Unhandled Lambda Execution Exception', err);
      return helpers.serverError('An unexpected server error occurred', err);
    }
  };
};

/**
 * Normalizes header lookups (case-insensitive)
 */
const getHeader = (headers = {}, key) => {
  const target = key.toLowerCase();
  const foundKey = Object.keys(headers).find((k) => k.toLowerCase() === target);
  return foundKey ? headers[foundKey] : undefined;
};

/**
 * Extracts institutionId strictly from verified JWT claims or fallback header
 */
const getInstitutionId = (event) => {
  const headers = event.headers || {};
  const authHeader = getHeader(headers, 'authorization') || '';
  const token = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.substring(7).trim() : '';

  if (token && token.includes('.')) {
    try {
      const parts = token.split('.');
      if (parts.length >= 2) {
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
        const claims = JSON.parse(jsonPayload);
        const tokenInst = claims['custom:institutionId'] || claims['institutionId'] || claims['institution'];
        if (tokenInst) return tokenInst;
      }
    } catch {
      // Continue to header fallback
    }
  }

  // Fallback to explicit header (for public/unauthenticated endpoints like admission apply or contact inquiry)
  return (
    getHeader(headers, 'institutionId') ||
    getHeader(headers, 'institution') ||
    constants.DEFAULT_INSTITUTION_ID
  );
};

/**
 * Extracts authenticated user claims from Cognito JWT
 */
const getAuthUser = (event) => {
  const headers = event.headers || {};
  const authHeader = getHeader(headers, 'authorization') || '';
  const token = authHeader.toLowerCase().startsWith('bearer ') ? authHeader.substring(7).trim() : '';

  if (!token || !token.includes('.')) return null;

  try {
    const parts = token.split('.');
    if (parts.length >= 2) {
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
      const claims = JSON.parse(jsonPayload);
      return {
        cognitoId: claims.sub || claims.cognitoId,
        email: claims.email,
        userType: claims['custom:userType'] || claims.userType || 'student',
        institutionId: claims['custom:institutionId'] || claims.institutionId || constants.DEFAULT_INSTITUTION_ID
      };
    }
  } catch {
    return null;
  }
  return null;
};

module.exports = {
  useMiddleware,
  getInstitutionId,
  getAuthUser,
  getHeader
};
