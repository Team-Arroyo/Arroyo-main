const isValidDateFormat = (dateString) => {
  const validDatePattern = /^\d{2}-\d{2}-\d{4}$/
  return validDatePattern.test(dateString);
}

const validateDateParams = (req, _, next) => {
  const { startDate, endDate } = req.query

  if((startDate && !endDate) || (!startDate && endDate)) {
    req.dateError = {
      status: 400,
      description: 'Bad Request',
      message: 'Missing date param',
      expectedFormat: '/api/s3objects?startDate=mm-dd-yyyy&endDate=mm-dd-yyyy'
    };
  } else if(startDate && endDate) {
    if(!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
      req.dateError = {
        status: 400,
        description: 'Bad Request',
        message: 'Malformed date parameter',
        expectedFormat: 'mm-dd-yyyy',
      }
    } else {
      req.startDate = startDate;
      req.endDate = endDate;
    }
  }

  next();
}

module.exports = validateDateParams;