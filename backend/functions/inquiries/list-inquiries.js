// serverless/functions/inquiries/list-inquiries.js
// Handler: GET /api/inquiries

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const InquiryLead = require('../../models/InquiryLead');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const query = event.queryStringParameters || {};

  const items = await InquiryLead.listByInstitution(institutionId, {
    status: query.status
  });

  return helpers.success(items, 'Inquiries retrieved successfully');
};

exports.main = useMiddleware(main);
