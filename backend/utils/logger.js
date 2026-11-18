// serverless/utils/logger.js
// Structured CloudWatch Logger for TEKKZY College Platform

let currentRequestId = null;

const setRequestId = (id) => {
  currentRequestId = id;
};

const formatMessage = (level, message, meta = {}) => {
  const logObj = {
    timestamp: new Date().toISOString(),
    service: 'tekkzy-college-backend',
    level,
    requestId: currentRequestId || 'N/A',
    message,
    ...meta
  };
  return JSON.stringify(logObj);
};

module.exports = {
  setRequestId,
  info: (message, meta) => console.log(formatMessage('INFO', message, meta)),
  warn: (message, meta) => console.warn(formatMessage('WARN', message, meta)),
  error: (message, error, meta = {}) => {
    const errorDetails = error instanceof Error
      ? { errorMessage: error.message, stack: error.stack }
      : { rawError: error };
    console.error(formatMessage('ERROR', message, { ...meta, ...errorDetails }));
  },
  debug: (message, meta) => {
    if (process.env.DEBUG === 'true') {
      console.debug(formatMessage('DEBUG', message, meta));
    }
  }
};
