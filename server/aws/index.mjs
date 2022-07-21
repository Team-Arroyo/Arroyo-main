import 'dotenv/config.js';
import { USER_LOGS_S3_BUCKET_NAME } from "./constants/general.mjs";
import getObjectsListFromBucket from "./libs/s3/getObjectListFromBucket.mjs";
import sendMessageToQueue from "./libs/sqs/sendMessageToQueue.mjs";

export const run = async () => {
  try {
    // main logic
    console.log("Getting object key data from S3 bucket");
    const bucketInventoryResponse = await getObjectsListFromBucket({ Bucket: USER_LOGS_S3_BUCKET_NAME });
    const bucketInventoryArray = bucketInventoryResponse.Contents;
    console.log(`Keys: ${bucketInventoryArray.map(obj => obj.Key).join(", ")}`);
    console.log("\n");
    console.log("Ready to send messages to the SQS queue\n");
    for (let objectIndex = 0; objectIndex < bucketInventoryArray.length; objectIndex++) {
      const objectKey = bucketInventoryArray[objectIndex].Key;
      const messageBody = JSON.stringify({ Bucket: USER_LOGS_S3_BUCKET_NAME, Key: objectKey});

      const queueMessageParams = {
        MessageBody: messageBody,
        QueueUrl: QueueUrl
      }
      const sendMessageToQueueResult = await sendMessageToQueue(queueMessageParams);
      console.log(`sending message #${objectIndex + 1}...\nMessage body: ${messageBody}.\n Message sent... \nstatus code: `, sendMessageToQueueResult['$metadata']['httpStatusCode']);
      console.log("\n");
    } 

  } catch (err) {
    console.log("Error, line 55:", err);
  }
};
run();