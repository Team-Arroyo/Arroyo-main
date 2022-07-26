import { AWSXRayDaemonWriteAccessARN,
  AmazonS3ReadOnlyAccessARN,
  AWSLambdaSQSQueueExecutionRoleARN, 
  AWSLambdaBasicExecutionRoleARN } from '../../constants/lambdaAWSPoliciesConst.mjs';

import 'dotenv/config.js';
import Configstore from 'configstore';
import fs from 'fs';
import deleteAllObjectsS3Bucket from '../../s3/deleteAllObjectsInS3Bucket.mjs';
import deleteS3Bucket from '../../s3/deleteS3Bucket.mjs';
import detachMultipleRolePolicies from '../../iam/detachMultipleRolePolicies.mjs';
import deleteRole from '../../iam/deleteRole.mjs';
import deleteLambda from '../../lambda/deleteLambda.mjs';
import deleteQueue from '../../sqs/deleteQueue.mjs';
import deleteEventSourceMapping from '../../lambda/deleteEventSourceMapping.mjs';
import pause from '../../../utils/pause.js';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});
import chalk from 'chalk';
const log = console.log;
const errorMessage = chalk.bold.red;
const message = chalk.hex('#051094');

const destroyResources = async () => {    

  const { lambdaS3BucketName, RehydrateSQSDLQUrl, StatusSQSDLQUrl, RehydrateSQSUrl, 
    RehydrateSQSArn, StatusSQSUrl, StatusSQSArn, lambdaRoleArn,
    lambdaRoleName, lambdaName, eventSourceMappingUUID, SQSSendMessagePolicy } = config.all;

  // All objects in the S3 bucket must be deleted first, only then we can delete the bucket itself
  try {
    await deleteAllObjectsS3Bucket({Bucket: lambdaS3BucketName});
    await pause(3000);
  } catch (error) {
    log(errorMessage(error));
  }
  
  try {
    await deleteS3Bucket({Bucket: lambdaS3BucketName});
    log(message('Deleted lambda deployment package'));
    await pause(3000);
  } catch (error) {
    log(errorMessage(error));
  }

  // First need to detach all policies from the role and only then, 
  // we are able to delete the role itself
  try {
    await detachMultipleRolePolicies({ 
      policyARNArray: [
        AWSXRayDaemonWriteAccessARN,
        AmazonS3ReadOnlyAccessARN,
        AWSLambdaSQSQueueExecutionRoleARN, 
        AWSLambdaBasicExecutionRoleARN,
        SQSSendMessagePolicy
        ], 
      roleName: lambdaRoleName 
    });
    await pause(3000);
  } catch (error) {
    log(errorMessage(error));
  }

  try {
    await deleteRole({ roleName: lambdaRoleName });
    await pause(3000);
    log(message('Deleted lambda role'));
  } catch (error) {
    log(errorMessage(error));
  }

  try {
    await deleteLambda({ lambdaName });
    await pause(3000);
    log(message('Deleted Lambda'));
  } catch (error) {
    log(errorMessage(error));
  }

  try {
    await deleteQueue({ SQSUrl: RehydrateSQSUrl });
    await pause(3000);
    log(message('Deleted RehydrateSQS'));
  } catch (error) {
    log(errorMessage(error));
  }

  try {
    await deleteQueue({ SQSUrl: RehydrateSQSDLQUrl });
    await pause(3000);
    log(message('Deleted RehydrateSQS DLQ'));
  } catch (error) {
    log(errorMessage(error));
  }

  try {
    await deleteQueue({ SQSUrl: StatusSQSUrl });
    await pause(3000);
    log(message('Deleted StatusSQS'));
  } catch (error) {
    log(errorMessage(error));
  }

  try {
    await deleteQueue({ SQSUrl: StatusSQSDLQUrl });
    await pause(3000);
    log(message('Deleted StatusSQS DLQ'));
  } catch (error) {
    log(errorMessage(error));
  }

  try {
    await deleteEventSourceMapping({ UUID: eventSourceMappingUUID });
    await pause(3000);
    log(message('Deleted Event source mapping'));
  } catch (error) {
    log(errorMessage(error));
  }
  
  log(message('Teardown completed.'));
}

export default destroyResources;

destroyResources();
