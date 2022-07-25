/* eslint-disable max-len */
/* eslint-disable import/extensions */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  htmlIdGenerator,
} from '@elastic/eui';
import axios from 'axios';
import { POST_QUERY_INGEST } from '../constants/ApiRoutes.js';

import { getKeysAndSetChoices } from './choicesSlice.js';

export const getLogLines = createAsyncThunk(
  'toasts/getLogLines',
  async (payload) => {
    const { data } = await axios.post(POST_QUERY_INGEST, payload);
    console.log('data', data);
    return data;
  },
);

export const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: (state, action) => state.push({ ...action.payload, id: htmlIdGenerator()() }),
    removeToast: (state, action) => state.filter((t) => t.id !== action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(getKeysAndSetChoices.rejected, (state, action) => [...state, {
      title: 'Error: Filtering unsuccessful',
      text: action.payload,
      color: 'danger',
      id: htmlIdGenerator()(),
    },
    ]);
    builder.addCase(getKeysAndSetChoices.fulfilled, (state, action) => {
      if (!action.payload.length) {
        return [...state, {
          title: 'No choices found',
          text: 'Try widening the date range',
          color: 'warning',
          id: htmlIdGenerator()(),
        }];
      }
      return state;
    });
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
