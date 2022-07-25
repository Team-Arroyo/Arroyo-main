/* eslint-disable import/extensions */
import { createSlice } from '@reduxjs/toolkit';
import {
  htmlIdGenerator,
} from '@elastic/eui';

export const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: (state, action) => state.push({ ...action.payload, id: htmlIdGenerator()() }),
    removeToast: (state, action) => state.filter((t) => t.id !== action.payload),
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
