// serverless/functions/admissions/apply.js
// Handler: POST /api/admissions/apply

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const AdmissionApplication = require('../../models/AdmissionApplication');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const body = event.body || {};

  try {
    const application = await AdmissionApplication.create(institutionId, body);
    return helpers.created(
      {
        applicationId: application.applicationId,
        applicantName: application.applicantName,
        programName: application.programName,
        status: application.status,
        createdAt: application.createdAt
      },
      'Application submitted successfully. Our admissions cell will contact you shortly.'
    );
  } catch (err) {
    return helpers.badRequest(err.message);
  }
};

exports.main = useMiddleware(main);
