import getBucketObjectsWithinDates from '../aws/s3/getBucketObjectsWithinDates.mjs'
import sendMessageToQueue from '../aws/sqs/sendMessageToQueue.mjs';
import dotenv from 'dotenv';
import Configstore from 'configstore';
import fs from 'fs';
dotenv.config();

const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const { RehydrateSQSUrl } = config.all;

const logstashEndpoint = process.env.LOGSTASH_HOST;
const Bucket = process.env.AWS_BUCKET_NAME;
const RehydrateQueueUrl = RehydrateSQSUrl || process.env.SQS_QUEUE;

const messageBodyTemplate = {
  Bucket,
  logstashEndpoint
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

  res.status(202).json({message: 'Rehydrating task in progress...'});
  
  try {
    objectKeys.forEach(Key => sendMessageToQueue({ messageBodyTemplate, additionalParams: { Key }, QueueUrl: RehydrateQueueUrl  }));
  } catch(err) {
    console.log('Error in file rehydrate', err);
  }
};

export const initializeQueryRehydrate = async(req, res) => {
  console.log('Query rehydrate');
  const startDate = req.startDate;
  const endDate = req.endDate;
  const Expression = req.sqlExpression;

  try {
    const logsWithinDates = await getBucketObjectsWithinDates({ startDate, endDate });
    if(logsWithinDates.length < 1) {
      res.status(400).json({message: 'No files found to ingest within date range'});
    } else {
      res.status(202).json({message: 'Rehydrating task in progress...'});
    }

    console.log('sending query');
    logsWithinDates.forEach(Key => sendMessageToQueue({messageBodyTemplate, additionalParams: { Key, Expression }, QueueUrl: RehydrateQueueUrl }));
  } catch(err) {
    console.log('Error in query rehydrate', err);
  }
};
