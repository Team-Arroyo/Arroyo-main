import { CreateEventSourceMappingCommand } from "@aws-sdk/client-lambda";
import lambdaClient from "../clients/lambdaClient.mjs";

const setLambdaEventSource = async ({ functionName, eventSourceArn }) => {
  try {
    const eventSourceMappingCommand = new CreateEventSourceMappingCommand({
      FunctionName: functionName,
      EventSourceArn: eventSourceArn
    });
    const eventSourceMappingCommandResponse = await lambdaClient.send(eventSourceMappingCommand);
    return eventSourceMappingCommandResponse;
  } catch (error) {
    console.log(error);
  }
}

export default setLambdaEventSource;