const axios = require('axios');

const host = process.env.LOGSTASH_HOST

const postToLogstash = async(jsonArray) => {
  try {
    const { data } = await axios.post(`http://${host}`, jsonArray);
    console.log("succeussfully ingested file");
  } catch(error) {
    console.log("Error in logstash service", error);
  }
}

module.exports = {
  postToLogstash
}