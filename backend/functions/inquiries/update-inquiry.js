// backend/functions/inquiries/update-inquiry.js
// Handler: PUT /api/inquiries/{inquiryId}

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const InquiryLead = require('../../models/InquiryLead');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const inquiryId = event.pathParameters ? event.pathParameters.inquiryId : null;
  const body = event.body || {};

  if (!inquiryId) {
    return helpers.badRequest('Missing inquiryId path parameter');
  }

  if (!body.status && !body.notes) {
    return helpers.badRequest('Missing update fields: status or notes required');
  }

  const updated = await InquiryLead.update(institutionId, inquiryId, {
    ...(body.status && { status: body.status }),
    ...(body.notes && { notes: body.notes }),
    ...(body.counselorName && { counselorName: body.counselorName })
  });

  if (!updated) {
    return helpers.notFound(`Inquiry '${inquiryId}' not found`);
  }

  return helpers.success(updated, 'Inquiry status updated successfully');
};

exports.main = useMiddleware(main);
