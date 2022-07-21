import iamClient from '../clients/iamClient.mjs';
import { DeleteRoleCommand } from '@aws-sdk/client-iam';

const deleteRole = async ({ roleName }) => {
    try {
      const data = await iamClient.send(new DeleteRoleCommand({
        RoleName: roleName
    }));
      console.log('Role deleted, data: ', data);
    } catch (err) {
      console.log('Error', err);
    }
};

export default deleteRole;

//TODO delete console log statements that aren't needed