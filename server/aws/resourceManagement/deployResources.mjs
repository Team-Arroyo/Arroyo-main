//TODO should we check if the resource exists and only then try creating it? (for each resource?)
import { LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME,
         REHYDRATION_LAMBDA_NAME,
         REHYDRATION_QUEUE_NAME,
         REHYDRATE_LAMBDA_ROLE_NAME,
         STATUS_QUEUE_NAME,
         REHYDRATION_DLQ,
         STATUS_DLQ
        } from '../constants/general.mjs';
import { DEPLOYMENT_PACKAGE_ARCHIVE_NAME, 
          DEPLOYMENT_PACKAGE_RUNTIME, 
          DEPLOYMENT_PACKAGE_HANDLER } from '../constants/lambdaDeploymentPackage.mjs'
import { AWSXRayDaemonWriteAccessARN,
          AmazonS3ReadOnlyAccessARN,
          AWSLambdaSQSQueueExecutionRoleARN, 
          AWSLambdaBasicExecutionRoleARN } from './iam/lambdaAWSPolicies.mjs';
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
import getQueueArn from '../sqs/getQueueArn.mjs';
import pause from '../../utils/pause.js';
import createSQSSEndMessagePolicy from './iam/createSQSSendMessagePolicy.mjs';
import fs from 'fs';

const uuid = uuidv4();
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});
config.clear();
config.set('uuid', uuid);

const deployResources = async () => {
  try {
    const labdaS3BucketName = `${LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME}-${uuid}`;

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
   
   // Create Rehydrate DLQ
    const rehydrateSQSDLQName = `${REHYDRATION_DLQ}-${uuid}`;
    const rehydrateSQSDLQUrl = await createQueue({
      QueueName: rehydrateSQSDLQName,
      Attributes: {
        MessageRetentionPeriod: '86400'
      }
    });
    await pause(5000);
    const rehydrateSQSDLQArn = await getQueueArn({ attributesArray: ['QueueArn'], queueURL: rehydrateSQSDLQUrl });
    console.log('Created RehydrateSQS Dead Letter Queue');
    config.set('RehydrateSQSDLQUrl', rehydrateSQSDLQUrl);
    await pause(10000);
    // Create Status DLQ
    const statusSQSDLQName = `${STATUS_DLQ}-${uuid}`;
    const statusSQSDLQUrl = await createQueue({
      QueueName: statusSQSDLQName,
      Attributes: {
        MessageRetentionPeriod: '86400'
      }
    });
    await pause(5000);
    const statusSQSDLQArn = await getQueueArn({ attributesArray: ['QueueArn'], queueURL: statusSQSDLQUrl });
    console.log('Created StatusSQS Dead Letter Queue');
    config.set('StatusSQSDLQUrl', statusSQSDLQUrl);

    // Create Rehydrate SQS
    await pause(10000);
    const rehydrateSQSName = `${REHYDRATION_QUEUE_NAME}-${uuid}`;

    const rehydrateSQSUrl = await createQueue({
      QueueName: rehydrateSQSName,
      Attributes: {
        MessageRetentionPeriod: '86400',
        RedrivePolicy: JSON.stringify({
          deadLetterTargetArn: rehydrateSQSDLQArn,
          maxReceiveCount: 1
        })
      }
    });

    await pause(5000);
    console.log('Created RehydrateSQS queue');
    config.set('RehydrateSQSUrl', rehydrateSQSUrl);
    
    const rehydrateSQSArn = await getQueueArn({ attributesArray: ['QueueArn'], queueURL: rehydrateSQSUrl });
    
    await pause(5000);
    console.log('Queue ARN: ', rehydrateSQSArn);
    console.log('\n');
    config.set('RehydrateSQSArn', rehydrateSQSArn);
    
    // Create Status SQS
    await pause(10000);
    const statusSQSName = `${STATUS_QUEUE_NAME}-${uuid}`;

    const statusSQSUrl = await createQueue({
      QueueName: statusSQSName,
      Attributes: {
        MessageRetentionPeriod: '86400',
        RedrivePolicy: JSON.stringify({
          deadLetterTargetArn: statusSQSDLQArn,
          maxReceiveCount: 1
        })
      }
    });
    await pause(5000);
    console.log('Created StatusSQS queue');
    config.set('StatusSQSUrl', statusSQSUrl);

    const statusSQSArn = await getQueueArn({ attributesArray: ['QueueArn'], queueURL: statusSQSUrl });
    await pause(5000);
    console.log('Queue ARN: ', statusSQSArn);
    console.log('\n');
    config.set('StatusSQSArn', statusSQSArn);

    const createSQSSendMessagePolicyResponce = await createSQSSEndMessagePolicy({ SQSArn: statusSQSArn, uuid});
    console.log('createSQSSendMessagePolicyResponce:\n',createSQSSendMessagePolicyResponce);
    await pause(5000);
    config.set('SQSSendMessagePolicy', createSQSSendMessagePolicyResponce.Policy.Arn)

    const lambdaRoleName = `${REHYDRATE_LAMBDA_ROLE_NAME}-${uuid}`;
    const lambdaRoleARN = await createRole(lambdaRoleName);
    console.log(`Role created. Role ARN: ${lambdaRoleARN}`);
    await pause(10000);
    config.set('lambdaRoleARN', lambdaRoleARN);
    config.set('lambdaRoleName', lambdaRoleName);
    
    await attachMultipleRolePolicies({ 
      policyARNArray: 
      [
        AWSXRayDaemonWriteAccessARN, 
        AmazonS3ReadOnlyAccessARN,
        AWSLambdaSQSQueueExecutionRoleARN, 
        AWSLambdaBasicExecutionRoleARN,
        createSQSSendMessagePolicyResponce.Policy.Arn
      ], 
      roleName: lambdaRoleName 
    });
    await pause(5000);

    const rehydrateLambdaName = `${REHYDRATION_LAMBDA_NAME}-${uuid}`;
    const rehydrateLambdaParams= {
      Code: {
        S3Bucket: labdaS3BucketName,
        S3Key: DEPLOYMENT_PACKAGE_ARCHIVE_NAME
      },
      Environment: {
        Variables: {
          STATUS_QUEUE_URL: statusSQSUrl
        }
      }
      ,
      FunctionName: rehydrateLambdaName,
      Role: lambdaRoleARN,
      Runtime: DEPLOYMENT_PACKAGE_RUNTIME,
      Handler: DEPLOYMENT_PACKAGE_HANDLER
    }
    
    await createLambda(rehydrateLambdaParams);
    console.log('Created Lambda\n');
    await pause(5000);
    config.set('lambdaName', rehydrateLambdaName);
    
    const eventSourceMappingUUID = await createEventSourceMapping({ 
      functionName: rehydrateLambdaName, 
      eventSourceArn: rehydrateSQSArn
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
