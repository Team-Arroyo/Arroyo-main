import ERROR_HANDLING from "../aws/constants/errorHandling.mjs";

const isValidDateFormat = (dateString) => {
  const validDatePattern = /^\d{2}-\d{2}-\d{4}$/;
  return validDatePattern.test(dateString);
};

const validateQueryDateParams = (req, _, next) => {
  const { startDate, endDate } = req.query;

  if((startDate && !endDate) || (!startDate && endDate)) {
    req.dateError = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.missingDateParameter,
      expectedFormat: ERROR_HANDLING.expectedFormatS3ObjectsRoute
    };
  } else if(startDate && endDate) {
    if(!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
      req.dateError = {
        status: 400,
        description: ERROR_HANDLING.badRequest,
        message: ERROR_HANDLING.malformedDateParameters,
        expectedFormat: ERROR_HANDLING.correctDateFormat,
      };
    } else {
      req.startDate = startDate;
      req.endDate = endDate;
    }
  }

  next();
};


export default validateQueryDateParams;
