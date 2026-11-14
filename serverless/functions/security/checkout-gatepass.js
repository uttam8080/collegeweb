// serverless/functions/security/checkout-gatepass.js
// Handler: PUT /api/security/gatepass/{passId}/checkout

const { useMiddleware, getInstitutionId } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const SecurityGatePass = require('../../models/SecurityGatePass');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const passId = event.pathParameters ? event.pathParameters.passId : null;

  if (!passId) {
    return helpers.badRequest('Missing passId path parameter');
  }

  const updated = await SecurityGatePass.checkout(institutionId, passId);
  if (!updated) {
    return helpers.notFound(`Gate pass '${passId}' not found`);
  }

  return helpers.success(
    {
      passId: updated.passId,
      checkOutTime: updated.checkOutTime,
      status: updated.status
    },
    'Visitor checkout recorded'
  );
};

exports.main = useMiddleware(main);
