// Import required AWS SDK clients and commands for Node.js.
import iamClient from "../clients/iamClient.mjs";
import { AttachRolePolicyCommand } from "@aws-sdk/client-iam";

const attachSinglePolicy = async ({ roleName, policyArn }) => {
    try {
      const data = await iamClient.send(new AttachRolePolicyCommand({
        PolicyArn: policyArn,
        RoleName: roleName
      }));
      console.log("Success. Policy attached. Data: ", data);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
};

export default attachSinglePolicy;

