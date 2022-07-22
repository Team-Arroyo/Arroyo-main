import SQL_EXPRESSION_TEMPLATES from '../aws/constants/sqlExpressionTemplates.mjs'

const createSqlExpression = (queries) => {
  const expressionTemplate = SQL_EXPRESSION_TEMPLATES.template;
  const keyValuePairs = queries.map((queryObj) => {
    const [ key, value ] = Object.entries(queryObj).pop();
    return `s.${key} = '${value}'`;
  });

  const queryString = keyValuePairs.join(SQL_EXPRESSION_TEMPLATES.andOperator);
  return `${expressionTemplate} ${queryString}`;
};

export default createSqlExpression;