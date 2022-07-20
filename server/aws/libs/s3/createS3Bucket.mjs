import s3Client from "../clients/s3Client.mjs"; 
import { CreateBucketCommand } from "@aws-sdk/client-s3";

const createS3Bucket = async (bucketName) => {
  try {
    const data = await s3Client.send(new CreateBucketCommand(bucketName));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export default createS3Bucket;