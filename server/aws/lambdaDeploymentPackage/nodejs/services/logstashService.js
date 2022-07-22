const axios = require('axios');

const postToLogstash = async(host, jsonArray) => {
  console.log("payload to ls", jsonArray);

  try {
    if(jsonArray.length < 1) {
      throw Error("Nothing will be ingested to logstash. Stopping ingestion.")
    }
    const { data } = await axios.post(`http://${host}`, jsonArray);
  } catch(err) {
    console.log("Error in logstash service", err);
    throw err;
  }
}

module.exports = {
  postToLogstash
}