// serverless/functions/admissions/list-applications.js
// Handler: GET /api/admissions

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const AdmissionApplication = require('../../models/AdmissionApplication');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const query = event.queryStringParameters || {};

  const items = await AdmissionApplication.listByInstitution(institutionId, {
    status: query.status
  });

  return helpers.success(items, 'Applications retrieved successfully');
};

exports.main = useMiddleware(main);
