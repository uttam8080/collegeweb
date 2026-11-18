// serverless/functions/notices/delete-notice.js
// Handler: DELETE /api/notices/{noticeId}

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const GazetteNotice = require('../../models/GazetteNotice');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const noticeId = event.pathParameters ? event.pathParameters.noticeId : null;

  if (!noticeId) {
    return helpers.badRequest('Missing noticeId path parameter');
  }

  await GazetteNotice.remove(institutionId, noticeId);
  return helpers.success({ noticeId }, 'Notice archived / deleted successfully');
};

exports.main = useMiddleware(main);
