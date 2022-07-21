import { DeleteEventSourceMappingCommand } from "@aws-sdk/client-lambda";
import lambdaClient from "../clients/lambdaClient.mjs";

const deleteEventSourceMapping = async (mappingUUID) => {
  try {
    const eventSourceMappingCommand = new DeleteEventSourceMappingCommand(mappingUUID);
    const eventSourceMappingCommandResponse = await lambdaClient.send(eventSourceMappingCommand);
    return eventSourceMappingCommandResponse;
  } catch (error) {
    console.log(error);
  }
}

export default deleteEventSourceMapping;