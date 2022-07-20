/* eslint-disable import/extensions */
import axios from 'axios';
import { GET_KEYS_URL, HYDRATE_LOG_URL } from '../constants/ApiRoutes.js';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common.Accept = 'application/json';

const getKeys = async (startDate, endDate) => {
  let queryParams;
  if (startDate && endDate) {
    queryParams = `?startDate=${startDate}&endDate=${endDate}`;
  }
  try {
    let response;
    if (queryParams) {
      response = await axios.get(GET_KEYS_URL + queryParams);
    } else {
      response = await axios.get(GET_KEYS_URL);
    }
    return response.data.objectKeys;
  } catch (error) {
    return error;
  }
};

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

/*
const postQueryIngest = async (payload) => {
  try {

  } catch (error) {
    return error;
  }
}
*/

const apiClient = {
  getKeys,
  getObject,
  getObjects,
  // postQueryIngest,
};

export default apiClient;
