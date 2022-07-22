import ERROR_HANDLING from "../aws/constants/errorHandling.mjs";

const validateObjectKeys = (req, _, next) => {
  const { objectKeys } = req.body;

  if(!objectKeys) {
    req.keyError = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.missingFieldObjectKeysInReqBody,
      expectedFormat: ERROR_HANDLING.objectKeysExpectedFormat
    };
  } else if (objectKeys.length < 1) {
    req.keyError = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.objectKeysEmpty,
      expectedFormat: ERROR_HANDLING.objectKeysExpectedFormat
    };
  } else {
    req.objectKeys = objectKeys;
  }
  
  next();
};

export default validateObjectKeys;
