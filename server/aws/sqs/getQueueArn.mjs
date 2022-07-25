import { GetQueueAttributesCommand } from '@aws-sdk/client-sqs';
import sqsClient from '../clients/sqsClient.mjs';

const getQueueArn = async ({ queueURL }) => {
  try {
    const getQueueAttributesCommand = new GetQueueAttributesCommand({
      AttributeNames: ['QueueArn'], 
      QueueUrl: queueURL
    });

    const getQueueAttributesResponse = await sqsClient.send(getQueueAttributesCommand);
    const attributesObject = getQueueAttributesResponse.Attributes;

    return attributesObject.QueueArn;
  } catch (err) {
    console.log('Error', err);
  }
};

export default getQueueArn;