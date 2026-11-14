// serverless/functions/notices/list-notices.js
// Handler: GET /api/notices

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const GazetteNotice = require('../../models/GazetteNotice');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const query = event.queryStringParameters || {};

  const items = await GazetteNotice.listByInstitution(institutionId, {
    category: query.category
  });

  return helpers.success(items, 'Gazette notices retrieved');
};

exports.main = useMiddleware(main);
