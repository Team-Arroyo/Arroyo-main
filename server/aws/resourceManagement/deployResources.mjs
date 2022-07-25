//TODO should we check if the resource exists and only then try creating it? (for each resource?)
import { LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME,
         REHYDRATION_LAMBDA_NAME,
         REHYDRATION_QUEUE_NAME,
         LAMBDA_ROLE_NAME 
        } from '../constants/general.mjs';
import { DEPLOYMENT_PACKAGE_ARCHIVE_NAME, 
          DEPLOYMENT_PACKAGE_RUNTIME, 
          DEPLOYMENT_PACKAGE_HANDLER } from '../constants/lambdaDeploymentPackage.mjs'
import { AWSXRayDaemonWriteAccessARN,
          AmazonS3ReadOnlyAccessARN,
          AWSLambdaSQSQueueExecutionRoleARN, 
          AWSLambdaBasicExecutionRoleARN } from '../constants/lambdaAWSPolicies.mjs';
import 'dotenv/config.js';
import Configstore from 'configstore';
import { v4 as uuidv4 } from 'uuid';
import createS3Bucket from '../s3/createS3Bucket.mjs';
import createQueue from '../sqs/createQueue.mjs';
import createRole from '../iam/createRole.mjs';
import createLambda from '../lambda/createLambda.mjs';
import createEventSourceMapping from '../lambda/createEventSourceMapping.mjs';
import attachMultipleRolePolicies from '../iam/attachMultipleRolePolicies.mjs';
import uploadObjectToBucket from '../s3/uploadObjectToBucket.mjs';
import getQueueAttributes from '../sqs/getQueueAttributes.mjs';
import pause from '../../utils/pause.js';
import fs from 'fs';

const uuid = uuidv4();
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {uuid: uuid});

const deployResources = async () => {
  try {
    let labdaS3BucketName = `${LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME}-${uuid}`;
    const createS3Response = await createS3Bucket(labdaS3BucketName);
    await pause(10000);
    config.set('lamdaS3BucketName', labdaS3BucketName);
    
    console.log(`Created S3 bucket. ${JSON.stringify(createS3Response)}`);
    
    const uploadObjectToBucketResponse = await uploadObjectToBucket({ 
      fileName: DEPLOYMENT_PACKAGE_ARCHIVE_NAME, 
      bucketName:labdaS3BucketName
    });
    
    console.log('Uploading lambda deployment package...');
    console.log('Please wait, it might take a minute or two...');
    console.log(`Uploaded deployment package to bucket. ${uploadObjectToBucketResponse}`);
    await pause(30000);
    const roleName = `${LAMBDA_ROLE_NAME}-${uuid}`;
    const { roleARN } = await createRole(roleName);
    console.log(`Role created. Role ARN: ${roleARN}`);
    await pause(10000);
    config.set('lamdaRoleARN', roleARN);
    config.set('roleName', roleName);
    
    await attachMultipleRolePolicies({ 
      policyARNArray: 
      [
        AWSXRayDaemonWriteAccessARN, 
        AmazonS3ReadOnlyAccessARN,
        AWSLambdaSQSQueueExecutionRoleARN, 
        AWSLambdaBasicExecutionRoleARN
      ], 
      roleName: roleName 
    });
    await pause(10000);
    const SQSName = `${REHYDRATION_QUEUE_NAME}-${uuid}`;
    const { QueueUrl } = await createQueue({
      QueueName: SQSName,
      Attributes: {
        MessageRetentionPeriod: '86400'
      }
    });
    await pause(5000);
    console.log('Created SQS queue');
    config.set('SQSUrl', QueueUrl);
    
    const { QueueArn } = await getQueueAttributes({ attributesArray: ['QueueArn'], queueURL: QueueUrl });
    await pause(5000);
    console.log('Queue ARN: ', QueueArn);
    console.log('\n');
    config.set('SQSArn', QueueArn);
    
    const lambdaName = `${REHYDRATION_LAMBDA_NAME}-${uuid}`;
    const lambdaParams= {
      Code: {
        S3Bucket: labdaS3BucketName,
        S3Key: DEPLOYMENT_PACKAGE_ARCHIVE_NAME
      },
      FunctionName: lambdaName,
      Role: roleARN,
      Runtime: DEPLOYMENT_PACKAGE_RUNTIME,
      Handler: DEPLOYMENT_PACKAGE_HANDLER
    }
    
    await createLambda(lambdaParams);
    console.log('Created Lambda\n');
    await pause(5000);
    config.set('lambdaName', lambdaName);
    
    const eventSourceMappingUUID = await createEventSourceMapping({ 
      functionName: lambdaName, 
      eventSourceArn: QueueArn 
    });
    await pause(5000);
    console.log('Created event source mapping\n');
    config.set('eventSourceMappingUUID', eventSourceMappingUUID);
    console.log('Done!');
    console.log(JSON.stringify(config.all));
  } catch (error) {
    console.log(error);
  }
}

export default deployResources;

deployResources();
