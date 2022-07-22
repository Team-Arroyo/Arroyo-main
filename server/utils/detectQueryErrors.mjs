const SUPPORTED_QUERY_NUM = 2;
import ERROR_HANDLING from "../aws/constants/errorHandling.mjs";

const isQueryInvalidFormat = (queryObj) => {
  const [key, value] = Object.entries(queryObj).pop();
  return (key === '' || typeof key !== 'string') || (value == '' || typeof value !== 'string');
};

const detectQueryErrors = (queries) => {
  let error;
  
  if(!queries || !Array.isArray(queries)) {
    error = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.queriesPropertyMissingOrInvalid,
      expectedFormat: {
        startDate: ERROR_HANDLING.correctDateFormat,
        endDate: ERROR_HANDLING.correctDateFormat,
        queries: [{logProperty: ERROR_HANDLING.logValue}]
      }
    };
  } else if(queries.length > SUPPORTED_QUERY_NUM) {
    error = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.invalidNumberOfKeyValPairs,
      maxExpectedPairs: SUPPORTED_QUERY_NUM,
    };
  } else if(queries.length < 1) {
    error = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.queriesPropertyEmpty,
    };
  } else if (queries.some(isQueryInvalidFormat)) {
    error = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.invalidKeyValueStructure,
      exampleFormat: { host_ip:  ERROR_HANDLING.exampleIPAddress}
    };
  }
  return error;
};

export default detectQueryErrors;