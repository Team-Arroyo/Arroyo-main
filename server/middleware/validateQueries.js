const SUPPORTED_QUERY_NUM = 2;

const isInvalidFormat = (queryObj) => {
  const [key, value] = Object.entries(queryObj).pop()
  return (key === "") || (value == "");
}

const detectQueryErrors = (queries) => {
  let error;
  
  if(queries.length > SUPPORTED_QUERY_NUM || queries.length < 1) {
    error = {
      status: 400,
      description: 'Bad Request',
      message: 'Invalid number of key/value pairs provided.',
      maxExpectedPairs: SUPPORTED_QUERY_NUM,
      minExpectedPairs: 1
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

const createSqlExpression = (queries) => {
  const expressionTemplate = "SELECT * FROM s3object s WHERE"
  // console.log("generating expression", queries);
  const keyValuePairs = queries.map((queryObj) => {
    const [ key, value ] = Object.entries(queryObj).pop();
    return `s.${key} = '${value}'`;
  });

  const queryString = keyValuePairs.join(" AND ");
  //console.log("final expression", `${expressionTemplate} ${queryString}`)
  return `${expressionTemplate} ${queryString}`;
}

const validateQueries = (req, _, next) => {
  const { queries } = req.body;
  if(queries) {
    req.queryError = detectQueryErrors(queries);
    req.sqlExpression = createSqlExpression(queries);
  } 

  next();
}

module.exports = validateQueries;