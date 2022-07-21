import { DeleteQueueCommand } from "@aws-sdk/client-sqs";
import sqsClient from "../clients/sqsClient.mjs";

const deleteQueue = async (queueUrl) => {
  try {
    const deleteQueueCommand = new DeleteQueueCommand({ QueueUrl: queueUrl });
    const deleteQueueResponse = await sqsClient.send(deleteQueueCommand);
    return deleteQueueResponse;
  } catch (err) {
    console.log("Error", err);
  }
};

export default deleteQueue;