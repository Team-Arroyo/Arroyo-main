import 'dotenv/config';
import { DEPLOYMENT_PACKAGE_ARCHIVE_NAME, 
         DEPLOYMENT_PACKAGE_RUNTIME, 
         DEPLOYMENT_PACKAGE_HANDLER } from "./constants/lambdaDeploymentPackage.mjs"
import {
  AWSXRayDaemonWriteAccessARN,
  AmazonS3ReadOnlyAccessARN,
  AWSLambdaSQSQueueExecutionRoleARN,
  AWSLambdaBasicExecutionRoleARN
} from "./constants/lambdaAWSPolicies.mjs";
import { USER_LOGS_S3_BUCKET_NAME,
         LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME,
         REHYDRATION_LAMBDA_NAME,
         REHYDRATION_QUEUE_NAME,
         LAMBDA_ROLE_NAME } from "./constants/general.mjs";
import getObjectsListFromBucket from "./libs/s3/getObjectListFromBucket.mjs";
import createQueue from './libs/sqs/createQueue.mjs';
import sendMessageToQueue from "./libs/sqs/sendMessageToQueue.mjs";
import getQueueAttributes from './libs/sqs/getQueueAttributes.mjs';
import createLambda from "./libs/lambda/createLambda.mjs";
import setLambdaEventSource from "./libs/lambda/setLambdaEventSource.mjs";
import lambdaClient from "./libs/clients/lambdaClient.mjs";
import uploadObjectToBucket from "./libs/s3/uploadObjectToBucket.mjs"
import createRole from "./libs/iam/createRole.mjs";
import attachMultiplePolicies from "./libs/iam/attachMultiplePolicies.mjs";

const REHYDRATION_QUEUE_PARAMS = {
  QueueName: REHYDRATION_QUEUE_NAME,
  Attributes: {
    MessageRetentionPeriod: '86400'
  }
};

export const run = async () => {
  try {
    const { roleARN } = await createRole(LAMBDA_ROLE_NAME);
    console.log(`Role created. Role ARN: ${roleARN}`);

    const lambdaPoliciesAttached = await attachMultiplePolicies({ 
      policyARNArray: 
      [
        AWSXRayDaemonWriteAccessARN, 
        AmazonS3ReadOnlyAccessARN,
        AWSLambdaSQSQueueExecutionRoleARN, 
        AWSLambdaBasicExecutionRoleARN
      ], 
      roleName: LAMBDA_ROLE_NAME 
    });

    // set up
    const uploadObjectToBucketResponse = await uploadObjectToBucket(DEPLOYMENT_PACKAGE_ARCHIVE_NAME);
    console.log("Uploading lambda deployment package...");
    console.log("Please wait, it might take a minute or two...");
    const timeoutID = setTimeout(async () => {
      const { QueueUrl } = await createQueue(REHYDRATION_QUEUE_PARAMS);
      console.log("Created SQS queue");
      const { QueueArn } = await getQueueAttributes({ attributesArray: ["QueueArn"], queueURL: QueueUrl });
      console.log("Queue ARN: ", QueueArn);
      console.log("\n");

      const lambdaParams= {
        Code: {
          S3Bucket: LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME,
          S3Key: DEPLOYMENT_PACKAGE_ARCHIVE_NAME
        },
        FunctionName: REHYDRATION_LAMBDA_NAME,
        Role: roleARN,
        Runtime: DEPLOYMENT_PACKAGE_RUNTIME,
        Handler: DEPLOYMENT_PACKAGE_HANDLER
      }

   // TODO Figure out what should be in const what should be in env variables
  //TODO should we check if the resource exists and only then try creating it? (for each resource?)
      try {
        await createLambda(lambdaParams);
        console.log("Created Lambda");
        console.log("\n");
      } catch (error) {
        console.log("=>", error);
        throw error;
      }

      try {
        await setLambdaEventSource({ 
          functionName: REHYDRATION_LAMBDA_NAME, 
          eventSourceArn: QueueArn 
        });
        console.log("Created event source mapping");
        console.log("\n");
      } catch(error) {
        console.log(error);
      }
  
      // main logic
      console.log("Getting object key data from S3 bucket");
      const bucketInventoryResponse = await getObjectsListFromBucket({ Bucket: USER_LOGS_S3_BUCKET_NAME });
      const bucketInventoryArray = bucketInventoryResponse.Contents;
      console.log(`Keys: ${bucketInventoryArray.map(obj => obj.Key).join(", ")}`);
      console.log("\n");
      console.log("Ready to send messages to the SQS queue\n");
      for (let objectIndex = 0; objectIndex < bucketInventoryArray.length; objectIndex++) {
        const objectKey = bucketInventoryArray[objectIndex].Key;
        const messageBody = JSON.stringify({ Bucket: USER_LOGS_S3_BUCKET_NAME, Key: objectKey});
  
        const queueMessageParams = {
          MessageBody: messageBody,
          QueueUrl: QueueUrl
        }
        const sendMessageToQueueResult = await sendMessageToQueue(queueMessageParams);
        console.log(`sending message #${objectIndex + 1}...\nMessage body: ${messageBody}.\n Message sent... \nstatus code: `, sendMessageToQueueResult['$metadata']['httpStatusCode']);
        console.log("\n");
      } 
      clearTimeout(timeoutID);
    }, 30 * 1000); // TODO extract timeout value to a constant

  } catch (err) {
    console.log("Error, line 55:", err);
  }
};
run();