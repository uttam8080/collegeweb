// backend/functions/placements/update-recruiter.js
// Handler: PUT /api/placements/recruiters/{recruiterId}

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const PlacementRecruiter = require('../../models/PlacementRecruiter');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const recruiterId = event.pathParameters ? event.pathParameters.recruiterId : null;
  const body = event.body || {};

  if (!recruiterId) {
    return helpers.badRequest('Missing recruiterId path parameter');
  }

  const updated = await PlacementRecruiter.update(institutionId, recruiterId, {
    ...(body.driveStatus && { driveStatus: body.driveStatus }),
    ...(body.packageCtc && { packageCtc: body.packageCtc }),
    ...(body.jobRoles && { jobRoles: body.jobRoles }),
    ...(body.totalOffers !== undefined && { totalOffers: body.totalOffers }),
    ...(body.driveDate && { driveDate: body.driveDate }),
    ...(body.notes && { notes: body.notes })
  });

  if (!updated) {
    return helpers.notFound(`Recruiter '${recruiterId}' not found`);
  }

  return helpers.success(updated, 'Recruiter drive information updated successfully');
};

exports.main = useMiddleware(main);
