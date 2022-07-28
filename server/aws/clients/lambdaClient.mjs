import { LambdaClient } from '@aws-sdk/client-lambda';

const lambdaClient = new LambdaClient({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

export default lambdaClient;