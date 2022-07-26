import { LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME, REHYDRATION_LAMBDA_NAME } from '../../constants/general.mjs';
import 'dotenv/config.js';
import Configstore from 'configstore';
import { v4 as uuidv4 } from 'uuid';
import createEventSourceMapping from '../../lambda/createEventSourceMapping.mjs';
import pause from '../../../utils/pause.js';
import deployLambdaDeploymentPackage from './deployLambdaDeploymentPackage.mjs';
import deployRehydrateSQSDLQ from './deployRehydrateSQSDLQ.mjs';
import deployStatusSQSDLQ from './deployStatusSQSDLQ.mjs';
import deployRehydrateSQS from './deployRehydrateSQS.mjs';
import deployStatusSQS from './deployStatusSQS.mjs';
import fs from 'fs';
import deployLambdaRole from './deployLambdaRole.mjs';
import deployRehydrateLambda from './deployRehydrateLambda.mjs';
import chalk from 'chalk';
const log = console.log;
const errorMessage = chalk.bold.red;
const message = chalk.hex('#0492C2');
// import ora from 'ora';
// const spinner = ora('Loading unicorns').start();

const uuid = uuidv4();
const packageJson = JSON.parse(fs.readFileSync('./AWSconfig.json', 'utf8'));
const config = new Configstore(packageJson.name, {});
config.clear();
config.set('uuid', uuid);

const deployResources = async () => {
  const lambdaS3BucketName = `${LAMBDA_DEPLOYMENT_PACKAGE_S3_BUCKET_NAME}-${uuid}`;

  try {
    // const deployLambdaDeploymentPackageSpinner = ora('Setting up lambda').start();
    await deployLambdaDeploymentPackage({ lambdaS3BucketName });
    log(message('Created deployment package for Lambda function'));
  } catch (error) {
    log(errorMessage(error));
  }

  await pause(30000);
  
  let rehydrateSQSDLQArn;
  try {
    rehydrateSQSDLQArn = await deployRehydrateSQSDLQ({ uuid });
    log(message('Created Rehydrate SQS Dead Letter Queue'));
  } catch (error) {
    log(errorMessage(error));
  }

  await pause(10000);
  let statusSQSDLQArn;
  try {
    statusSQSDLQArn = await deployStatusSQSDLQ({ uuid });
    log(message('Created StatusSQS Dead Letter Queue'));
  } catch (error) {
    log(errorMessage(error));
  }

  await pause(10000);
  let rehydrateSQSArn;

  try {
    rehydrateSQSArn = await deployRehydrateSQS({ uuid, rehydrateSQSDLQArn });
    log(message('Created RehydrateSQS queue'));
  } catch (error) {
    log(errorMessage(error));
  }
  
  await pause(10000);
  
  let statusSQSArn;
  let statusSQSUrl;
  try {
    ({ statusSQSArn, statusSQSUrl } = await deployStatusSQS({ uuid, statusSQSDLQArn }));
    log(message('Created StatusSQS queue'));
  } catch(error) {
    log(errorMessage(error));
  }
  
  await pause(10000);
  
  try {
    await deployLambdaRole({ uuid, statusSQSArn });
    log(message('Created IAM role for Lambda'));
  } catch (error) {
    log(errorMessage(error));
  }

  await pause(5000);
  const rehydrateLambdaName = `${REHYDRATION_LAMBDA_NAME}-${uuid}`;
  
  const lambdaRoleArn = config.get('lambdaRoleArn');
  try {
    await deployRehydrateLambda({ lambdaS3BucketName, statusSQSUrl, lambdaRoleArn, rehydrateLambdaName });
    log(message('Created Lambda'));
  } catch(error) {
    log(errorMessage(error));
  }

  await pause(10000);

  try {
    const eventSourceMappingUUID = await createEventSourceMapping({ 
      functionName: rehydrateLambdaName, 
      eventSourceArn: rehydrateSQSArn
    });
  
    config.set('eventSourceMappingUUID', eventSourceMappingUUID);
    log(message('Created Event source mapping'));
    log(chalk.yellow('Done!'));
  } catch(error) {
    log(errorMessage(error));
  }

  log(chalk.yellow(JSON.stringify(config.all)));
}

export default deployResources;

deployResources();
