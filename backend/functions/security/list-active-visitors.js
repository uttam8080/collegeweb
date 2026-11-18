// serverless/functions/security/list-active-visitors.js
// Handler: GET /api/security/active-visitors

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const SecurityGatePass = require('../../models/SecurityGatePass');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const items = await SecurityGatePass.listActiveVisitors(institutionId);
  return helpers.success(items, 'Active campus visitors list retrieved');
};

exports.main = useMiddleware(main);
