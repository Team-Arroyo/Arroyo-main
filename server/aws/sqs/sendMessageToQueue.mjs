import { SendMessageCommand } from '@aws-sdk/client-sqs';
import sqsClient from '../clients/sqsClient.mjs';

const sendMessageToQueue = async (messageParams) => {
  try {
    const command = new SendMessageCommand(messageParams);
    const response = await sqsClient.send(command);
    return response;
  } catch (err) {
    console.log('Error', err);
  }
};

export default sendMessageToQueue;