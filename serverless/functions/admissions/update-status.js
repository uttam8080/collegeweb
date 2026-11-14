// serverless/functions/admissions/update-status.js
// Handler: PUT /api/admissions/{applicationId}/status

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const AdmissionApplication = require('../../models/AdmissionApplication');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const applicationId = event.pathParameters ? event.pathParameters.applicationId : null;
  const body = event.body || {};

  if (!applicationId) {
    return helpers.badRequest('Missing applicationId path parameter');
  }

  if (!body.status) {
    return helpers.badRequest('Missing required field: status');
  }

  const updated = await AdmissionApplication.update(institutionId, applicationId, {
    status: body.status,
    notes: body.notes
  });

  if (!updated) {
    return helpers.notFound(`Application '${applicationId}' not found`);
  }

  return helpers.success(updated, 'Application status updated successfully');
};

exports.main = useMiddleware(main);
