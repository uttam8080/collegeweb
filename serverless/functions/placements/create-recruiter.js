// serverless/functions/placements/create-recruiter.js
// Handler: POST /api/placements/recruiters

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const PlacementRecruiter = require('../../models/PlacementRecruiter');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const body = event.body || {};

  try {
    const recruiter = await PlacementRecruiter.create(institutionId, body);
    return helpers.created(
      {
        recruiterId: recruiter.recruiterId,
        organizationName: recruiter.organizationName,
        contactPerson: recruiter.contactPerson,
        driveStatus: recruiter.driveStatus
      },
      'Recruitment inquiry logged successfully'
    );
  } catch (err) {
    return helpers.badRequest(err.message);
  }
};

exports.main = useMiddleware(main);
