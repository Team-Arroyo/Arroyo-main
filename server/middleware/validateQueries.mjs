import detectQueryErrors from "../utils/detectQueryErrors.mjs";
import createSqlExpression from "../utils/createSQLExpression.mjs";

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