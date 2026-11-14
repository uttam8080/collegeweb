// serverless/functions/user/create-profile.js
// Handler: POST /api/users

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const UserProfile = require('../../models/UserProfile');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const body = event.body || {};

  try {
    const profile = await UserProfile.create(institutionId, body);
    return helpers.created(profile, 'User profile registered successfully');
  } catch (err) {
    return helpers.badRequest(err.message);
  }
};

exports.main = useMiddleware(main);
