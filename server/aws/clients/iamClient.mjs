import { IAMClient } from '@aws-sdk/client-iam';

const iamClient = new IAMClient({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

export default iamClient;