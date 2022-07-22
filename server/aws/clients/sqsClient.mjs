import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';

dotenv.config();

const sqsClient = new SQSClient({ 
  region: process.env.AWS_REGION
});
export default sqsClient;