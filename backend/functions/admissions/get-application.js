// serverless/functions/admissions/get-application.js
// Handler: GET /api/admissions/{applicationId}

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const AdmissionApplication = require('../../models/AdmissionApplication');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const applicationId = event.pathParameters ? event.pathParameters.applicationId : null;

  if (!applicationId) {
    return helpers.badRequest('Missing applicationId path parameter');
  }

  const application = await AdmissionApplication.get(institutionId, applicationId);
  if (!application) {
    return helpers.notFound(`Application '${applicationId}' not found`);
  }

  return helpers.success(application, 'Application details retrieved');
};

exports.main = useMiddleware(main);
