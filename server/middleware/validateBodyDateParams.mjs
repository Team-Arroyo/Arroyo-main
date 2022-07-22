import ERROR_HANDLING from "../aws/constants/errorHandling.mjs";
import isValidDateOrder from "../utils/isValidDateOrder.mjs";

const isValidDateFormat = (dateString) => {
  const validDatePattern = /^\d{2}-\d{2}-\d{4}$/;
  return validDatePattern.test(dateString) && !isNaN(Date.parse(dateString));
};

const validateBodyDateParams = (req, res, next) => {
  const { startDate, endDate } = req.body;
  let error;

  if(!startDate || !endDate) {
    error = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.missingEndDateStartDateOrBoth,
      expectedFormat: {
        startDate: ERROR_HANDLING.correctDateFormat,
        endDate: ERROR_HANDLING.correctDateFormat,
        queries: [{logProperty: ERROR_HANDLING.logValue}]
      }
    };
  } else if(!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    error = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.malformedDateParameters,
      startDateRecieved: startDate,
      endDateRecieved: endDate,
      expectedFormat: ERROR_HANDLING.correctDateFormat,
    };
  } else if(!isValidDateOrder(startDate, endDate)) {
    error = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.startDateMustBelessThanOrEqualToEndDate,
    };
  } else {
    req.startDate = startDate;
    req.endDate = endDate;
  }

  if(error) {
    res.status(400).json(error);
    res.connection.destroy();
  } else {
    next();
  }
};

export default validateBodyDateParams;