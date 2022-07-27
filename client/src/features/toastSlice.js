import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { htmlIdGenerator } from '@elastic/eui';
import { POST_QUERY_INGEST } from '../constants/ApiRoutes.js';
import { getKeysAndSetChoices } from './choicesSlice.js';

export const getLogLines = createAsyncThunk(
  'toasts/getLogLines',
  async (payload) => {
    try {
      const response = await axios.post(POST_QUERY_INGEST, payload);
      return response.data.message;
    } catch (err) {
      return Promise.reject(err.response.data);
    }
  },
);

export const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: (state, action) => {
      // eslint-disable-next-line prefer-const
      let { eventType, failedFiles } = action.payload;
      if (!failedFiles.length) {
        return [...state, { id: htmlIdGenerator()(), title: `${eventType} search complete`, color: 'success' }];
      }
      failedFiles = failedFiles.map((f) => f.objectKey);
      return [...state, {
        id: htmlIdGenerator()(),
        title: `${eventType} search failed`,
        color: 'danger',
        text: failedFiles.join(),
      }];
    },
    addDateToast: (state, action) => [...state, { ...action.payload, id: htmlIdGenerator()() }],
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
    builder.addCase(getLogLines.fulfilled, (state, action) => [...state, {
      title: 'Query search started',
      text: action.payload,
      color: 'success',
      id: htmlIdGenerator()(),
    }]);
    builder.addCase(getLogLines.rejected, (state, action) => [...state, {
      title: 'Query search failed',
      text: action.error.message,
      color: 'danger',
      id: htmlIdGenerator()(),
    }]);
  },
});

export const { addToast, removeToast, addDateToast } = toastSlice.actions;

export default toastSlice.reducer;
