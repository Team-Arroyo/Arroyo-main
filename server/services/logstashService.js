const axios = require('axios');

const host = process.env.LOGSTASH_HOST

const config = {
  headers: {
    'Content-Type': 'text/plain'
  }
}

const postToLogstash = async(contents) => {
  try {
    const { data } = await axios.post(`http://${host}`, contents, config)
    console.log("succeussfully ingested file")
  } catch(err) {
    console.log("Error in logstash service", err)
  }
}

module.exports = {
  postToLogstash
}