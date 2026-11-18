// serverless/functions/security/create-gatepass.js
// Handler: POST /api/security/gatepass

const { useMiddleware, getInstitutionId, getAuthUser } = require('../../utils/middleware');
const helpers = require('../../utils/helpers');
const SecurityGatePass = require('../../models/SecurityGatePass');

const main = async (event) => {
  const institutionId = getInstitutionId(event);
  const authUser = getAuthUser(event);
  const body = event.body || {};

  try {
    const passData = {
      ...body,
      issuedByGuardId: authUser ? authUser.cognitoId : 'gate-guard-1'
    };
    const pass = await SecurityGatePass.create(institutionId, passData);
    return helpers.created(
      {
        passId: pass.passId,
        visitorName: pass.visitorName,
        checkInTime: pass.checkInTime,
        status: pass.status
      },
      'Gate pass created and visitor entry registered'
    );
  } catch (err) {
    return helpers.badRequest(err.message);
  }
};

exports.main = useMiddleware(main);
