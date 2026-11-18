// serverless/functions/placements/list-recruiters.js
// Handler: GET /api/placements/recruiters

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const PlacementRecruiter = require('../../models/PlacementRecruiter');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const query = event.queryStringParameters || {};

  const items = await PlacementRecruiter.listByInstitution(institutionId, {
    driveStatus: query.driveStatus
  });

  return helpers.success(items, 'Recruiters roster retrieved');
};

exports.main = useMiddleware(main);
