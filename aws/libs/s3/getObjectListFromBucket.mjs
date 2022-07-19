import s3Client from "../clients/s3Client.mjs"; // Helper function that creates an Amazon S3 service client module.
import { ListObjectsCommand } from "@aws-sdk/client-s3";

const getObjectsListFromBucket = async (bucketParams) => {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export default getObjectsListFromBucket;