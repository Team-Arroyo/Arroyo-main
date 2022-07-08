import axios from "axios"

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
axios.defaults.headers.common["Accept"] = "application/json"

const getKeys = async() => {
  try {
    const { data } = await axios.get("http://localhost:5001/api/s3objects");
    return data.objectKeys
  } catch (error) {
    return error
  }
}

const getObject = async(key) => {
  try {
    const { data } = await axios.post("http://localhost:5001/api/s3object/rehydrate", {
      "objectKey": key
    });
    return data.message;
  } catch (error) {
    return error
  }
}

const apiClient = {
  getKeys,
  getObject,
}

export default apiClient
