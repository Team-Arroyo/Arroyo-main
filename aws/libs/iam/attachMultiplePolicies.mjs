import attachSinglePolicy from "./attachSinglePolicy.mjs";

const attachMultiplePolicies = async ({ policyARNArray, roleName }) => {

    try {
      for (let index = 0; index < policyARNArray.length; index++) {
        await attachSinglePolicy({ roleName, policyArn: policyARNArray[index]});
      }
      return true;
    } catch (err) {
      console.log("Error", err);
    }
};

export default attachMultiplePolicies;

