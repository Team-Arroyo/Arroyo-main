<<<<<<< HEAD:server/controller/rehydrateController.js
const { rehydrateFullS3Object, rehydrateQueriedS3Object } = require("./s3ObjectController")
const { getBucketObjectsWithinDates } = require("../lib/s3Client");
const { testSqsConnection, sendMessageToQueue } = require("../lib/sqsClient");
=======
import { rehydrateS3Objects } from './s3ObjectController.mjs';
>>>>>>> deploy_test:server/controller/rehydrateController.mjs

const isTotalFailure = (batch) => {
  return batch.every(({ status }) => status === 'fail');
};

const initializeRehydrateJob = (req, res) => {
  console.log('Rehydrating tasks in progress...');
  const keyError = req.keyError;

  const objectKeys = req.objectKeys;

  if(keyError) {
<<<<<<< HEAD:server/controller/rehydrateController.js
    console.log("keyError detected");
    console.log("Rehydrating tasks stopped...");
=======
    console.log('Rehydrating tasks stopped...');
>>>>>>> deploy_test:server/controller/rehydrateController.mjs
    res.status(400).json(keyError);
    return;
  }
  
  const promises  = objectKeys.map(objectKey => rehydrateFullS3Object(objectKey))

  objectKeys.forEach(Key => sendMessageToQueue({Key}));

  Promise.allSettled(promises).then(resultArray => {
    console.log("All promises settled");
    const batchStatus = resultArray.map(({ reason, value }) => reason ? reason : value);
<<<<<<< HEAD:server/controller/rehydrateController.js
    console.log("Batch status", batchStatus);
    console.log("Rehydrating tasks completed...");
=======
    console.log(batchStatus);
    console.log('Rehydrating tasks completed...');
>>>>>>> deploy_test:server/controller/rehydrateController.mjs


    res.status(isTotalFailure(batchStatus) ? 400 : 200).json({batchStatus});
  });
};

<<<<<<< HEAD:server/controller/rehydrateController.js
const initializeQueryRehydrate = async(req, res) => {
  const startDate = req.startDate;
  const endDate = req.endDate;
  const Expression = req.sqlExpression;

  // console.log("startDate", startDate);
  // console.log("endDate", endDate);
  // console.log("expression", Expression);

  try {
    const logsWithinDates = await getBucketObjectsWithinDates(startDate, endDate);
    if(logsWithinDates.length < 1) {
      res.status(400).json({message: 'No files found to ingest within date range'});
    } else {
      //final test of AWS credentials and infastructure before returning 202 status
      await testSqsConnection();
      res.status(202).json({message: 'Rehydrating task in progress...'});
    }

    logsWithinDates.forEach(Key => sendMessageToQueue({Key, Expression}))
  } catch(err) {
    res.status(500).send({
      message: "AWS responded with an error.", 
      error: err
    });
  }
}

module.exports = {
  initializeRehydrateJob,
  initializeQueryRehydrate
}
=======
export default initializeRehydrateJob;

// module.exports = initializeRehydrateJob;
>>>>>>> deploy_test:server/controller/rehydrateController.mjs
