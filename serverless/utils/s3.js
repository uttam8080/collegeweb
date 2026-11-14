// serverless/utils/s3.js
// Amazon S3 Document Storage and Pre-signed URL Manager for TEKKZY College of Technology

const logger = require('./logger');

let s3Client;

const getS3Client = () => {
  if (!s3Client) {
    let AWS;
    try {
      AWS = require('aws-sdk');
      s3Client = new AWS.S3({
        region: process.env.AWS_REGION || process.env.REGION || 'ap-south-1',
        signatureVersion: 'v4'
      });
    } catch {
      logger.warn('aws-sdk not installed locally; using mock S3 client');
      return {
        getSignedUrlPromise: async (operation, params) => {
          return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}?mock-presigned=true`;
        }
      };
    }
  }
  return s3Client;
};

const bucketName = process.env.DOCUMENTS_BUCKET_NAME || 'tekkzy-college-documents-dev';

module.exports = {
  /**
   * Generates a pre-signed PUT URL for direct client-side document uploads (marksheets, resumes, ID cards)
   */
  getUploadUrl: async (s3Key, contentType, expiresInSeconds = 900) => {
    logger.info('Generating S3 Pre-signed Upload URL', { s3Key, contentType });
    const s3 = getS3Client();
    const params = {
      Bucket: bucketName,
      Key: s3Key,
      ContentType: contentType,
      Expires: expiresInSeconds
    };
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return {
      uploadUrl,
      s3Key,
      bucket: bucketName,
      expiresInSeconds
    };
  },

  /**
   * Generates a pre-signed GET URL for secure viewing of candidate documents
   */
  getDownloadUrl: async (s3Key, expiresInSeconds = 1800) => {
    logger.info('Generating S3 Pre-signed Download URL', { s3Key });
    const s3 = getS3Client();
    const params = {
      Bucket: bucketName,
      Key: s3Key,
      Expires: expiresInSeconds
    };
    return s3.getSignedUrlPromise('getObject', params);
  }
};
