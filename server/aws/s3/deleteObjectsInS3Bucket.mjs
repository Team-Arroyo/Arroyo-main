import s3Client from "../clients/s3Client.mjs"; 
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import getObjectsListFromBucket from "./getObjectListFromBucket.mjs";

const deleteObjectsS3Bucket = async (bucketName, objectKey) => {
  try {
    const response = await getObjectsListFromBucket(bucketName);
    let objectsToDelete = [];

    if (response) {
      objectsToDelete = response.Contents.map(object => { Key: object.Key });
    }

    const data = await s3Client.send(new DeleteObjectsCommand({ 
      Bucket: bucketName,
      Delete: {
        Objects: objectsToDelete 
      }
    }));
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

export default deleteObjectsS3Bucket;