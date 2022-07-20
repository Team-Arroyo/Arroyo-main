//TODO should we check if the resource exists and only then try creating it? (for each resource?)
import 'dotenv/config.js';
import { LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME,
         REHYDRATION_LAMBDA_NAME,
         REHYDRATION_QUEUE_NAME,
         LAMBDA_ROLE_NAME 
        } from "../constants/general.mjs";
import createS3Bucket from "../s3/createS3Bucket.mjs";
import createQueue from '../sqs/createQueue.mjs';
import createRole from "../iam/createRole.mjs";
import createLambda from "../lambda/createLambda.mjs";
import createEventSourceMapping from "../lambda/createEventSourceMapping.mjs";
import attachMultipleRolePolicies from "../iam/attachMultipleRolePolicies.mjs";
import uploadObjectToBucket from "../s3/uploadObjectToBucket.mjs";
import getQueueAttributes from "../sqs/getQueueAttributes.mjs";
import { DEPLOYMENT_PACKAGE_ARCHIVE_NAME, 
         DEPLOYMENT_PACKAGE_RUNTIME, 
         DEPLOYMENT_PACKAGE_HANDLER } from "../constants/lambdaDeploymentPackage.mjs"
import { AWSXRayDaemonWriteAccessARN,
         AmazonS3ReadOnlyAccessARN,
         AWSLambdaSQSQueueExecutionRoleARN, 
         AWSLambdaBasicExecutionRoleARN } from "../constants/lambdaAWSPolicies.mjs";

async function pause(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const deployResources = async () => {
  try {
    const createS3Response = await createS3Bucket(LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME);
    await pause(10000);
    console.log(`Created S3 bucket. ${createS3Response}`);
    const uploadObjectToBucketResponse = await uploadObjectToBucket(DEPLOYMENT_PACKAGE_ARCHIVE_NAME);
    
    console.log("Uploading lambda deployment package...");
    console.log("Please wait, it might take a minute or two...");
    console.log(`Uploaded deployment package to bucket. ${uploadObjectToBucketResponse}`);
    await pause(30000);
  
    const { roleARN } = await createRole(LAMBDA_ROLE_NAME);
    console.log(`Role created. Role ARN: ${roleARN}`);
    await pause(10000);

    await attachMultipleRolePolicies({ 
      policyARNArray: 
      [
        AWSXRayDaemonWriteAccessARN, 
        AmazonS3ReadOnlyAccessARN,
        AWSLambdaSQSQueueExecutionRoleARN, 
        AWSLambdaBasicExecutionRoleARN
      ], 
      roleName: LAMBDA_ROLE_NAME 
    });
    await pause(10000);
    const { QueueUrl } = await createQueue({
      QueueName: REHYDRATION_QUEUE_NAME,
      Attributes: {
        MessageRetentionPeriod: '86400'
      }
    });
    await pause(5000);
    console.log("Created SQS queue");
    const { QueueArn } = await getQueueAttributes({ attributesArray: ["QueueArn"], queueURL: QueueUrl });
    console.log("Queue ARN: ", QueueArn);
    console.log("\n");
    await pause(5000);

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

    await createLambda(lambdaParams);
    console.log("Created Lambda");
    console.log("\n");
    await pause(5000);

    await createEventSourceMapping({ 
      functionName: REHYDRATION_LAMBDA_NAME, 
      eventSourceArn: QueueArn 
    });
    console.log("Created event source mapping");
    console.log("\n");

  } catch (error) {
    console.log(error);
  }
}

export default deployResources;

deployResources();
