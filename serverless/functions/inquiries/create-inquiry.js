// serverless/functions/inquiries/create-inquiry.js
// Handler: POST /api/inquiries

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const InquiryLead = require('../../models/InquiryLead');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const body = event.body || {};

  try {
    const inquiry = await InquiryLead.create(institutionId, body);
    return helpers.created(
      {
        inquiryId: inquiry.inquiryId,
        name: inquiry.name,
        email: inquiry.email,
        status: inquiry.status
      },
      'Inquiry received. A college representative will respond shortly.'
    );
  } catch (err) {
    return helpers.badRequest(err.message);
  }
};

exports.main = useMiddleware(main);
