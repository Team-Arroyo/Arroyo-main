import createSqlExpression from "./createSQLExpression.mjs";

describe('creates a SQL expression', () => {
  const inputArrayOfObjects = [{ip: '3.121.56.100'}, {method: 'GET'}]
  test('query includes two conditions', () => {
    expect(createSqlExpression(inputArrayOfObjects)).toBe("SELECT * FROM s3object s WHERE s.ip = '3.121.56.100' AND s.method = 'GET'")
  });
  
  test('returned value is a string', () => {
    expect(typeof createSqlExpression(inputArrayOfObjects)).toBe('string');
  });
})