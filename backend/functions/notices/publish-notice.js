// serverless/functions/notices/publish-notice.js
// Handler: POST /api/notices

const { useMiddleware, getInstitutionId, getAuthUser } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const GazetteNotice = require('../../models/GazetteNotice');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const authUser = getAuthUser(event);
  const body = event.body || {};

  try {
    const noticeData = {
      ...body,
      publishedBy: authUser ? authUser.cognitoId : 'registrar-admin'
    };
    const notice = await GazetteNotice.create(institutionId, noticeData);
    return helpers.created(notice, 'Gazette notice published successfully');
  } catch (err) {
    return helpers.badRequest(err.message);
  }
};

exports.main = useMiddleware(main);
