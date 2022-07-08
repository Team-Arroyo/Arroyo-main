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

const apiClient = {
  getKeys,
}

export default apiClient
