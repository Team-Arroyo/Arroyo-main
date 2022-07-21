import { DeleteFunctionCommand } from '@aws-sdk/client-lambda';
import LambdaClient from '../clients/lambdaClient.mjs';

const deleteLambda = async ({ lambdaName }) => {
  try {
    const command = new DeleteFunctionCommand({ FunctionName: lambdaName });
    const response = await LambdaClient.send(command);

    return response;
  } catch (err) {
    console.log('Error', err);
  }
};

export default deleteLambda;