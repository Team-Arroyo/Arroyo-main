const validateObjectKeys = (req, _, next) => {
  const { objectKeys } = req.body;

  if(!objectKeys) {
    req.keyError = {
      status: 400,
      description: 'Bad Request',
      message: 'Missing field objectKeys in req. body',
      expectedFormat: '{objectKeys: [file1.log, file2.log]}'
    };
  } else if (objectKeys.length < 1) {
    req.keyError = {
      status: 400,
      description: 'Bad Request',
      message: 'objectKeys is empty. No results will be produced.',
      expectedFormat: '{objectKeys: [file1.log, file2.log]}'
    };
  } else {
    req.objectKeys = objectKeys;
  }
  
  next();
};

export default validateObjectKeys;
// module.exports = validateObjectKeys;