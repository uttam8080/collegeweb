// serverless/functions/user/list-profiles.js
// Handler: GET /api/users

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const UserProfile = require('../../models/UserProfile');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const query = event.queryStringParameters || {};

  const items = await UserProfile.listByInstitution(institutionId, {
    userType: query.userType
  });

  return helpers.success(items, 'User profiles list retrieved');
};

exports.main = useMiddleware(main);
