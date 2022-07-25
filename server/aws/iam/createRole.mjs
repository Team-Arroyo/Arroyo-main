import iamClient from '../clients/iamClient.mjs';
import { CreateRoleCommand } from '@aws-sdk/client-iam';
import { LAMBDA_ASSUME_ROLE_POLICY } from '../resourceManagement/iam/lambdaAWSPolicies.mjs';

const createRole = async (roleName) => {
  const roleParams = {
      AssumeRolePolicyDocument: LAMBDA_ASSUME_ROLE_POLICY,
      Path: '/',
      RoleName: roleName
  };
    try {
      const data = await iamClient.send(new CreateRoleCommand(roleParams));
      return data.Role.Arn;
    } catch (err) {
      console.log('Error', err);
    }
};

export default createRole;

