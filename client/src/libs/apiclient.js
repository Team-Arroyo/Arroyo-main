/* eslint-disable import/extensions */
import axios from 'axios';
import { GET_KEYS_URL, HYDRATE_LOG_URL } from '../constants/ApiRoutes.js';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common.Accept = 'application/json';

const getObject = async (key) => {
  try {
    const { data } = await axios.post(HYDRATE_LOG_URL, {
      objectKey: key,
    });
    return data.message;
  } catch (error) {
    return error;
  }
};

const getObjects = async (keys) => {
  const requestBody = {
    objectKeys: keys,
  };
  let response;
  try {
    response = await axios.post(GET_KEYS_URL, requestBody);
    return response.data;
  } catch (error) {
    return error;
  }
};

const apiClient = {
  getObject,
  getObjects,
};

export default apiClient;
