import attachSinglePolicy from "./attachSinglePolicy.mjs";

const attachMultiplePolicies = async ({ policyARNArray, roleName }) => {

    try {
      console.log(`Attaching ${policyARNArray.length} policies to "${roleName}" role.`);
      console.log("\n");
      for (let index = 0; index < policyARNArray.length; index++) {
        console.log(`Attaching policy. Policy ARN: "${policyARNArray[index]}"`)
        await attachSinglePolicy({ roleName, policyArn: policyARNArray[index]});
        console.log("\n");
      }
      return true;
    } catch (err) {
      console.log("Error", err);
    }
};

export default attachMultiplePolicies;

