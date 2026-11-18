// backend/functions/user/update-profile.js
// Handler: PUT /api/users/{cognitoId}

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const UserProfile = require('../../models/UserProfile');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const cognitoId = event.pathParameters ? event.pathParameters.cognitoId : null;
  const body = event.body || {};

  if (!cognitoId) {
    return helpers.badRequest('Missing cognitoId path parameter');
  }

  const updated = await UserProfile.update(institutionId, cognitoId, {
    ...(body.fullName && { fullName: body.fullName }),
    ...(body.phoneNumber && { phoneNumber: body.phoneNumber }),
    ...(body.department && { department: body.department }),
    ...(body.designation && { designation: body.designation }),
    ...(body.status && { status: body.status })
  });

  if (!updated) {
    return helpers.notFound(`User profile '${cognitoId}' not found`);
  }

  return helpers.success(updated, 'User profile updated successfully');
};

exports.main = useMiddleware(main);
