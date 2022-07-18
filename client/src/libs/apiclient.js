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
    let data;
    if (queryParams) {
      data = await axios.get(GET_KEYS_URL + queryParams);
    } else {
      data = await axios.get(GET_KEYS_URL);
    }
    console.log('data', data.data.objectKeys);
    return data.data.objectKeys;
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

const apiClient = {
  getKeys,
  getObject,
};

export default apiClient;
