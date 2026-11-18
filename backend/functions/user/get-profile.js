// serverless/functions/user/get-profile.js
// Handler: GET /api/users/{cognitoId}

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const UserProfile = require('../../models/UserProfile');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const cognitoId = event.pathParameters ? event.pathParameters.cognitoId : null;

  if (!cognitoId) {
    return helpers.badRequest('Missing cognitoId path parameter');
  }

  const profile = await UserProfile.get(institutionId, cognitoId);
  if (!profile) {
    return helpers.notFound(`User profile '${cognitoId}' not found`);
  }

  return helpers.success(profile, 'User profile retrieved');
};

exports.main = useMiddleware(main);
