const SUPPORTED_QUERY_NUM = 2;

const isInvalidFormat = (queryObj) => {
  const [key, value] = Object.entries(queryObj).pop()
  return (key === "" || typeof key !== 'string') || (value == "" || typeof value !== 'string');
}

const createSqlExpression = (queries) => {
  const expressionTemplate = "SELECT * FROM s3object s WHERE"
  const keyValuePairs = queries.map((queryObj) => {
    const [ key, value ] = Object.entries(queryObj).pop();
    return `s.${key} = '${value}'`;
  });

  const queryString = keyValuePairs.join(" AND ");
  return `${expressionTemplate} ${queryString}`;
}

const detectQueryErrors = (queries) => {
  let error;
  
  if(!queries || !Array.isArray(queries)) {
    error = {
      status: 400,
      description: 'Bad Request',
      message: 'Queries property is either missing ot not an array',
      expectedFormat: {
        startDate: "mm-dd-yyyy",
        endDate: "mm-dd-yyyy",
        queries: [{logProperty: "logValue"}]
      }
    }
  } else if(queries.length > SUPPORTED_QUERY_NUM) {
    error = {
      status: 400,
      description: 'Bad Request',
      message: 'Invalid number of key/value pairs provided.',
      maxExpectedPairs: SUPPORTED_QUERY_NUM,
    }
  } else if(queries.length < 1) {
    error = {
      status: 400,
      description: 'Bad Request',
      message: 'queries array was provided, but is empty.',
    }
  } else if (queries.some(isInvalidFormat)) {
      error = {
        status: 400,
        description: 'Bad Request',
        message: 'Improper key/value object structure ',
        exampleFormat: JSON.parse(`{ "host_ip": "192.168.1.1" }`)
      }
  }
  return error;
}

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

}

module.exports = validateQueries;