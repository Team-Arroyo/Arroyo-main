import iamClient from "../clients/iamClient.mjs";
import { CreateRoleCommand } from "@aws-sdk/client-iam";

const deleteRole = async (roleName) => {
  const roleParams = {
      RoleName: roleName
  };
    try {
      const data = await iamClient.send(new CreateRoleCommand(roleParams));
      console.log("Role delted, data: ", data);
    } catch (err) {
      console.log("Error", err);
    }
};

export default deleteRole;

//TODO delete console log statements that aren't needed