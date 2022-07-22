/* eslint-disable no-undef */
import { SQSClient, SendMessageCommand, GetQueueUrlCommand } from '@aws-sdk/client-sqs';

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const logstashEndpoint = process.env.LOGSTASH_HOST;
const Bucket = process.env.AWS_BUCKET_NAME;
const QueueUrl = process.env.SQS_QUEUE;
const QueueName = process.env.SQS_QUEUE_NAME;

const messageBodyTemplate = {
  Bucket,
  logstashEndpoint
};

const sqsClient = new SQSClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

export const sendMessageToQueue = async(additionalParams) => {
  const MessageBody = JSON.stringify({...messageBodyTemplate, ...additionalParams});

  const messageParams = {
    MessageBody,
    QueueUrl
  };

  console.log('messaggeParams', messageParams);

  try {
    const command = new SendMessageCommand(messageParams);
    await sqsClient.send(command);
  } catch(err) {
    console.log('Error sending messages to sqs queue.', err);
  }
};

export const testSqsConnection = async() => {
  try {
    const command = new GetQueueUrlCommand({QueueName});
    await sqsClient.send(command);
  } catch(err) {
    console.log('Error in SQS connect test', err);
    throw err;
  }
};

