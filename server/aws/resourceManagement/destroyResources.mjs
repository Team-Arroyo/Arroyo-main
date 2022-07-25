import { AWSXRayDaemonWriteAccessARN,
  AmazonS3ReadOnlyAccessARN,
  AWSLambdaSQSQueueExecutionRoleARN, 
  AWSLambdaBasicExecutionRoleARN } from './iam/lambdaAWSPolicies.mjs';

import 'dotenv/config.js';
import Configstore from 'configstore';
import fs from 'fs';
import deleteAllObjectsS3Bucket from '../s3/deleteAllObjectsInS3Bucket.mjs';
import deleteS3Bucket from '../s3/deleteS3Bucket.mjs';
import detachMultipleRolePolicies from '../iam/detachMultipleRolePolicies.mjs';
import deleteRole from '../iam/deleteRole.mjs';
import deleteLambda from '../lambda/deleteLambda.mjs';
import deleteQueue from '../sqs/deleteQueue.mjs';
import deleteEventSourceMapping from '../lambda/deleteEventSourceMapping.mjs';
import pause from '../../utils/pause.js';
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});

const destroyResources = async () => {    
  try {
    const { lamdaS3BucketName, RehydrateSQSDLQUrl, StatusSQSDLQUrl, RehydrateSQSUrl, 
      RehydrateSQSArn, StatusSQSUrl, StatusSQSArn, lambdaRoleARN,
      lambdaRoleName, lambdaName, eventSourceMappingUUID, SQSSendMessagePolicy } = config.all;
  
    // All objects in the S3 bucket must be deleted first, only then we can delete the bucket itself
    const deleteAllObjectsResponse = await deleteAllObjectsS3Bucket({Bucket: lamdaS3BucketName});
    await pause(3000);
    console.log(deleteAllObjectsResponse);

    const deleteBucketResponse = await deleteS3Bucket({Bucket: lamdaS3BucketName});
    await pause(3000);
    console.log(deleteBucketResponse);

    // First need to detach all policies from the role and only then, 
    // we are able to delete the role itself
    const detachPoliciesResponse = await detachMultipleRolePolicies({ 
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
    console.log(detachPoliciesResponse);
    
    const deleteRoleResponse = await deleteRole({ roleName: lambdaRoleName });
    await pause(3000);
    console.log(deleteRoleResponse);
    
    const deleteLambdaResponse = await deleteLambda({ lambdaName });
    await pause(3000);
    console.log(`Deleting lambda: ${lambdaName}\n`, deleteLambdaResponse);
    
    const deleteRehydrateQueueResponse = await deleteQueue({ SQSUrl: RehydrateSQSUrl });
    await pause(3000);
    console.log(`Deleting queue with url: ${RehydrateSQSUrl}\n`, deleteRehydrateQueueResponse);
    
    const deleteRehydrateDLQResponse = await deleteQueue({ SQSUrl: RehydrateSQSDLQUrl });
    await pause(3000);
    console.log(`Deleting queue with url: ${RehydrateSQSDLQUrl}\n`, deleteRehydrateDLQResponse);
    
    const deleteStatusQueueResponse = await deleteQueue({ SQSUrl: StatusSQSUrl });
    await pause(3000);
    console.log(`Deleting queue with url: ${StatusSQSUrl}\n`, deleteStatusQueueResponse);
    
    const deleteStatusDLQResponse = await deleteQueue({ SQSUrl: StatusSQSDLQUrl });
    await pause(3000);
    console.log(`Deleting queue with url: ${StatusSQSDLQUrl}\n`, deleteStatusDLQResponse);
    
    const deleteEventSourceMappingResponse = await deleteEventSourceMapping({ UUID: eventSourceMappingUUID });
    await pause(3000);
    console.log(deleteEventSourceMappingResponse);

    console.log('Teardown completed.')
    console.log(config.clear())
  } catch (error) {
    console.log(error);
  }
}

export default destroyResources;

destroyResources();
