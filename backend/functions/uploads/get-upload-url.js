// serverless/functions/uploads/get-upload-url.js
// Handler: POST /api/uploads/presigned-url

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const s3 = require('../../utils/s3');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const body = event.body || {};

  if (!body.fileName || !body.fileType) {
    return helpers.badRequest('Missing fileName or fileType in request body');
  }

  const folder = body.folder || 'general';
  const cleanFileName = body.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const s3Key = `${institutionId}/${folder}/${Date.now()}-${cleanFileName}`;

  try {
    const uploadData = await s3.getUploadUrl(s3Key, body.fileType);
    return helpers.success(uploadData, 'Pre-signed S3 upload URL generated');
  } catch (err) {
    return helpers.serverError('Failed to generate pre-signed upload URL', err);
  }
};

exports.main = useMiddleware(main);
