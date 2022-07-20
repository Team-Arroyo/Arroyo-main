const { rehydrateFullS3Object, rehydrateQueriedS3Object } = require("./s3ObjectController")

const isTotalFailure = (batch) => {
  return batch.every(({ status }) => status === 'fail');
}

const initializeRehydrateJob = (req, res) => {
  console.log("Rehydrating tasks in progress...")
  const keyError = req.keyError;
  const queryError = req.queryError;

  const objectKeys = req.objectKeys;
  const sqlExpression = req.sqlExpression;

  if(keyError) {
    console.log("keyError detected");
    console.log("Rehydrating tasks stopped...");
    res.status(400).json(keyError);
    return;
  } else if (queryError) {
    console.log("queryError detected");
    console.log("Rehydrating tasks stopped...");
    res.status(400).json(queryError);
    return;
  }
  
  const promises  = objectKeys.map(objectKey => {
    return sqlExpression ? 
      rehydrateQueriedS3Object(objectKey, sqlExpression) 
      :rehydrateFullS3Object(objectKey)
  });

  Promise.allSettled(promises).then(resultArray => {
    console.log("All promises settled");
    const batchStatus = resultArray.map(({ reason, value }) => reason ? reason : value);
    console.log("Batch status", batchStatus);
    console.log("Rehydrating tasks completed...");


    res.status(isTotalFailure(batchStatus) ? 400 : 200).json({batchStatus})
  });
  // res.status(500).json({message: 'in dev'});
}

module.exports = initializeRehydrateJob;
