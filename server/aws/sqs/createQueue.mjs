import { CreateQueueCommand } from "@aws-sdk/client-sqs";
import sqsClient from "../clients/sqsClient.mjs";

const createQueue = async (queueParams) => {
  try {
    const createQueueCommand = new CreateQueueCommand(queueParams);
    const createQueueResponse = await sqsClient.send(createQueueCommand);

    return { QueueUrl: createQueueResponse.QueueUrl };
  } catch (err) {
    console.log("Error", err);
  }
};

export default createQueue;