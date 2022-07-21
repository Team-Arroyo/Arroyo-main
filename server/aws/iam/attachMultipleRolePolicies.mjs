import attachSingleRolePolicy from './attachSingleRolePolicy.mjs';

const attachMultipleRolePolicies = async ({ policyARNArray, roleName }) => {

    try {
      console.log(`Attaching ${policyARNArray.length} policies to '${roleName}' role.`);
      console.log('\n');
      for (let index = 0; index < policyARNArray.length; index++) {
        console.log(`Attaching policy. Policy ARN: '${policyARNArray[index]}'`)
        await attachSingleRolePolicy({ roleName, policyArn: policyARNArray[index]});
        console.log('\n');
      }
      return true;
    } catch (err) {
      console.log('Error', err);
    }
};

export default attachMultipleRolePolicies;