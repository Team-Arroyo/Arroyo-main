import { GetQueueAttributesCommand } from '@aws-sdk/client-sqs';
import sqsClient from '../clients/sqsClient.mjs';

const getQueueAttributes = async ({ attributesArray, queueURL }) => {
  try {
    const getQueueAttributesCommand = new GetQueueAttributesCommand({
      AttributeNames: attributesArray, 
      QueueUrl: queueURL
    });

    const getQueueAttributesResponse = await sqsClient.send(getQueueAttributesCommand);
    const attributesObject = getQueueAttributesResponse.Attributes;
    
    const resultObj = {};
    for (const attribute in attributesObject) {
      resultObj[attribute] = attributesObject[attribute];
    }

    return resultObj;
  } catch (err) {
    console.log('Error', err);
  }
};

export default getQueueAttributes;