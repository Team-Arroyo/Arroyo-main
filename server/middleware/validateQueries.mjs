const SUPPORTED_QUERY_NUM = 2;
import ERROR_HANDLING from "../aws/constants/errorHandling.mjs";
import SQL_EXPRESSION_TEMPLATES from '../aws/constants/sqlExpressionTemplates.mjs'

const isInvalidFormat = (queryObj) => {
  const [key, value] = Object.entries(queryObj).pop();
  return (key === '' || typeof key !== 'string') || (value == '' || typeof value !== 'string');
};

const createSqlExpression = (queries) => {
  const expressionTemplate = SQL_EXPRESSION_TEMPLATES.template;
  const keyValuePairs = queries.map((queryObj) => {
    const [ key, value ] = Object.entries(queryObj).pop();
    return `s.${key} = '${value}'`;
  });

  const queryString = keyValuePairs.join(SQL_EXPRESSION_TEMPLATES.andOperator);
  return `${expressionTemplate} ${queryString}`;
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
  } else if (queries.some(isInvalidFormat)) {
    error = {
      status: 400,
      description: ERROR_HANDLING.badRequest,
      message: ERROR_HANDLING.invalidKeyValueStructure,
      exampleFormat: { host_ip:  ERROR_HANDLING.exampleIPAddress}
    };
  }
  return error;
};

const validateQueries = (req, res, next) => {
  const { queries } = req.body;
  
  const error = detectQueryErrors(queries);

  if(error) {
    res.status(400).json(error);
    res.connection.destroy();
  } else {
    req.sqlExpression = createSqlExpression(queries);
    next();
  }

};

export default validateQueries;