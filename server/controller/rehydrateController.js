const { rehydrateS3Objects } = require("./s3ObjectController")

const isTotalFailure = (batch) => {
  return batch.every(({ status }) => status === 'fail');
}

const initializeRehydrateJob = (req, res) => {
  console.log("Rehydrating tasks in progress...")
  const keyError = req.keyError;
  const objectKeys = req.objectKeys;

  if(keyError) {
    console.log("Rehydrating tasks stopped...");
    res.status(400).json(keyError);
    return;
  }
  
  const promises  = objectKeys.map(objectKey => rehydrateS3Objects(objectKey));
  Promise.allSettled(promises).then(resultArray => {
    console.log(resultArray);
    const batchStatus = resultArray.map(({ reason, value }) => reason ? reason : value);
    console.log(batchStatus);
    console.log("Rehydrating tasks completed...");


    res.status(isTotalFailure(batchStatus) ? 400 : 200).json({batchStatus})
  });
}

module.exports = initializeRehydrateJob;
