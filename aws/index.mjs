import 'dotenv/config';
import getObjectsListFromBucket from "./libs/s3/getObjectListFromBucket.mjs";
import createQueue from './libs/sqs/createQueue.mjs';
import sendMessageToQueue from "./libs/sqs/sendMessageToQueue.mjs";
import getQueueAttributes from './libs/sqs/getQueueAttributes.mjs';
import { REHYDRATION_QUEUE_PARAMS } from "./params/sqsParams.mjs"
import { REHYDRATION_LAMBDA_PARAMS } from "./params/lambdaParams.mjs"
import createLambda from "./libs/lambda/createLambda.mjs";
import setLambdaEventSource from "./libs/lambda/setLambdaEventSource.mjs";
import lambdaClient from "./libs/clients/lambdaClient.mjs";
import { DEPLOYMENT_PACKAGE_ARCHIVE_NAME } from "./constants/lambdaDeploymentPackage.mjs";
import uploadObjectToBucket from "./libs/s3/uploadObjectToBucket.mjs"
// NOTE Dont forget about AWS Lambda execution role

export const run = async () => {
  try {
    // set up
    const uploadObjectToBucketResponse = await uploadObjectToBucket(DEPLOYMENT_PACKAGE_ARCHIVE_NAME);
    console.log("Uploading lambda deployment package...");
    console.log("Please wait, it might take a minute or two...");
    const timeoutID = setTimeout(async () => {
      const { QueueUrl } = await createQueue(REHYDRATION_QUEUE_PARAMS);
      const { QueueArn } = await getQueueAttributes({ attributesArray: ["QueueArn"], queueURL: QueueUrl });
  
      const createLambdaResponse = await createLambda(REHYDRATION_LAMBDA_PARAMS);
      const setLambdaEventSourceResult = await setLambdaEventSource({ 
        functionName: process.env.REHYDRATION_LAMBDA_NAME, 
        eventSourceArn: QueueArn 
      });
      console.log(uploadObjectToBucketResponse);
  
      // main logic
      const bucketInventoryResponse = await getObjectsListFromBucket({ Bucket: process.env.USER_LOGS_S3_BUCKET_NAME });
  
      const bucketInventoryArray = bucketInventoryResponse.Contents;
  
      for (let objectIndex = 0; objectIndex < bucketInventoryArray.length; objectIndex++) {
        const objectKey = bucketInventoryArray[objectIndex].Key;
  
        const queueMessageParams = {
          MessageBody: JSON.stringify({ Bucket: process.env.USER_LOGS_S3_BUCKET_NAME, Key: objectKey}),
          QueueUrl: QueueUrl
        }
        const sendMessageToQueueResult = await sendMessageToQueue(queueMessageParams);
        console.log("sending message... \nresponse: ", sendMessageToQueueResult);
      }
      clearTimeout(timeoutID);
    }, 30 * 1000);

  } catch (err) {
    console.log("Error, line 55:", err);
  }
};
run();