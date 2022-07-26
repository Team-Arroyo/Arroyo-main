import sqsClient from '../clients/sqsClient.mjs';
import { GetQueueAttributesCommand } from '@aws-sdk/client-sqs';

const testQueueConnection = async(QueueUrl) => {
  const command = new GetQueueAttributesCommand({QueueUrl});
  try {
    await sqsClient.send(command);
  } catch(err) {
    console.log('Error connecting to queue', err);
    throw err;
  }
};

export default testQueueConnection;