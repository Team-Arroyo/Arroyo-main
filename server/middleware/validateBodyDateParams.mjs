const isValidDateFormat = (dateString) => {
  const validDatePattern = /^\d{2}-\d{2}-\d{4}$/;
  return validDatePattern.test(dateString) && !isNaN(Date.parse(dateString));
};

const isValidDateOrder = (startDate, endDate) => {
  return Date.parse(startDate) <= Date.parse(endDate);
};

const validateBodyDateParams = (req, res, next) => {
  const { startDate, endDate } = req.body;
  let error;

  if(!startDate || !endDate) {
    error = {
      status: 400,
      description: 'Bad Request',
      message: 'Missing startDate,endDate, or both properities in req. body',
      expectedFormat: {
        startDate: 'mm-dd-yyyy',
        endDate: 'mm-dd-yyyy',
        queries: [{logProperty: 'logValue'}]
      }
    };
  } else if(!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    error = {
      status: 400,
      description: 'Bad Request',
      message: 'Malformed date parameter(s)',
      startDateRecieved: startDate,
      endDateRecieved: endDate,
      expectedFormat: 'mm-dd-yyyy',
    };
  } else if(!isValidDateOrder(startDate, endDate)) {
    error = {
      status: 400,
      description: 'Bad Request',
      message: 'startDate must be <= endDate',
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