import { CreateFunctionCommand } from "@aws-sdk/client-lambda";
import LambdaClient from "../clients/lambdaClient.mjs";

const createLambda = async (lambdaParams) => {
  try {
    const command = new CreateFunctionCommand(lambdaParams);
    const response = await LambdaClient.send(command);

    return response;
  } catch (err) {
    console.log("Error", err);
  }
};

export default createLambda;