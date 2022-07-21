const { SQSClient, SendMessageCommand, GetQueueUrlCommand } = require("@aws-sdk/client-sqs");

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const logstashEndpoint = process.env.LOGSTASH_HOST;
const Bucket = process.env.AWS_BUCKET_NAME;
const QueueUrl = process.env.SQS_QUEUE;
const QueueName = process.env.SQS_QUEUE_NAME;

const messageBodyTemplate = {
  Bucket,
  logstashEndpoint
}

// console.log("ac", accessKeyId);
// console.log("sc", secretAccessKey);
// console.log("endpt", logstashEndpoint);
// console.log("bucker", Bucket);
// console.log("queue_url", QueueUrl);


const sqsClient = new SQSClient({
  region: "us-east-1",
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

const sendMessageToQueue = async(additionalParams) => {
  const MessageBody = JSON.stringify({...messageBodyTemplate, ...additionalParams});

  const messageParams = {
    MessageBody,
    QueueUrl
  };

  console.log('messaggeParams', messageParams);

  try {
    const command = new SendMessageCommand(messageParams);
    const response = await sqsClient.send(command);
  } catch(err) {
    console.log('Error sending messages to sqs queue.', err);
  }
}

const testSqsConnection = async() => {
  try {
    const command = new GetQueueUrlCommand({QueueName});
    const response = await sqsClient.send(command);
  } catch(err) {
    console.log('Error in SQS connect test', err);
    throw err;
  }
}

module.exports = {
  testSqsConnection,
  sendMessageToQueue
}

