// serverless/functions/settings/update-college-config.js
// Handler: PUT /api/institution/config

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const CollegeConfig = require('../../models/CollegeConfig');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const body = event.body || {};

  const updated = await CollegeConfig.updateCollegeProfile(institutionId, body);
  return helpers.success(updated, 'College configuration updated successfully');
};

exports.main = useMiddleware(main);
