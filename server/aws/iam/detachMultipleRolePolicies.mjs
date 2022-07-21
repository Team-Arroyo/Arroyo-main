import detachSingleRolePolicy from './detachSingleRolePolicy.mjs';

const detachMultipleRolePolicies = async ({ policyARNArray, roleName }) => {

    try {
      console.log(`Detaching ${policyARNArray.length} policies to '${roleName}' role.`);
      console.log('\n');
      for (let index = 0; index < policyARNArray.length; index++) {
        console.log(`Detaching policy. Policy ARN: '${policyARNArray[index]}'`)
        await detachSingleRolePolicy({ roleName, policyArn: policyARNArray[index]});
        console.log('\n');
      }
      return true;
    } catch (error) {
      console.log('Error', error);
    }
};

export default detachMultipleRolePolicies;

// TODO change all err variables to error