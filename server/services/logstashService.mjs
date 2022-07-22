import axios from 'axios';

// eslint-disable-next-line no-undef
const host = process.env.LOGSTASH_HOST;

export const postToLogstash = async(jsonArray) => {
  try {
    await axios.post(`http://${host}`, jsonArray);
    console.log('succeussfully ingested file');
  } catch(error) {
    console.log('Error in logstash service', error);
  }
};

