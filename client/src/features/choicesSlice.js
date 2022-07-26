import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_KEYS_URL } from '../constants/ApiRoutes.js';

export const getKeysAndSetChoices = createAsyncThunk(
  'choices/getKeysAndSetChoices',
  async (arg) => {
    const { startDate, endDate } = arg;
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
      return Promise.reject(error);
    }
  },
);

export const choiceSlice = createSlice({
  name: 'choices',
  initialState: [],
  reducers: {
    setChoices: (state, action) => [...action.payload],
  },
  extraReducers: (builder) => {
    builder.addCase(getKeysAndSetChoices.fulfilled, (state, action) => [...action.payload]);
  },
});

export const { setChoices } = choiceSlice.actions;

export default choiceSlice.reducer;
