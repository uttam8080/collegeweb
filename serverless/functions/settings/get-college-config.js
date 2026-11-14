// serverless/functions/settings/get-college-config.js
// Handler: GET /api/institution/config

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const CollegeConfig = require('../../models/CollegeConfig');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const config = await CollegeConfig.getCollegeProfile(institutionId);
  return helpers.success(config, 'College configuration retrieved');
};

exports.main = useMiddleware(main);
