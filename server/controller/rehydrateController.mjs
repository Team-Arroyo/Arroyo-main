import { rehydrateFullS3Object } from './s3ObjectController.mjs';
import getBucketObjectsWithinDates from '../aws/s3/getBucketObjectsWithinDates.mjs'
import sendMessageToQueue from '../aws/sqs/sendMessageToQueue.mjs';
import getQueue from '../aws/sqs/getQueue.mjs';

const logstashEndpoint = process.env.LOGSTASH_HOST;
const Bucket = process.env.AWS_BUCKET_NAME;
const QueueUrl = process.env.SQS_QUEUE;
const QueueName = process.env.SQS_QUEUE_NAME;


const messageBodyTemplate = {
  Bucket,
  logstashEndpoint
};


const isTotalFailure = (batch) => {
  return batch.every(({ status }) => status === 'fail');
};

export const initializeRehydrateJob = (req, res) => {
  console.log('Rehydrating tasks in progress...');
  const keyError = req.keyError;

  const objectKeys = req.objectKeys;

  if(keyError) {
    console.log('Rehydrating tasks stopped...');
    res.status(400).json(keyError);
    return;
  }
  
  const promises  = objectKeys.map(objectKey => rehydrateFullS3Object(objectKey));

  objectKeys.forEach(Key => sendMessageToQueue({ messageBodyTemplate, additionalParams: { Key, QueueUrl } }));

  Promise.allSettled(promises).then(resultArray => {
    console.log('All promises settled');
    const batchStatus = resultArray.map(({ reason, value }) => reason ? reason : value);
    console.log(batchStatus);
    console.log('Rehydrating tasks completed...');


    res.status(isTotalFailure(batchStatus) ? 400 : 200).json({batchStatus});
  });
};

export const initializeQueryRehydrate = async(req, res) => {
  const startDate = req.startDate;
  const endDate = req.endDate;
  const Expression = req.sqlExpression;

  try {
    const logsWithinDates = await getBucketObjectsWithinDates({ startDate, endDate });
    if(logsWithinDates.length < 1) {
      res.status(400).json({message: 'No files found to ingest within date range'});
    } else {
      //final test of AWS credentials and infastructure before returning 202 status
      await getQueue({ QueueName });
      res.status(202).json({message: 'Rehydrating task in progress...'});
    }

    logsWithinDates.forEach(Key => sendMessageToQueue({ additionalParams: { Key, Expression } }));
  } catch(err) {
    res.status(500).send({
      message: 'AWS responded with an error.', 
      error: err
    });
  }
};
