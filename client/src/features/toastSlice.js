/* eslint-disable import/extensions */
import { createSlice } from '@reduxjs/toolkit';
import {
  htmlIdGenerator,
} from '@elastic/eui';
import { getKeysAndSetChoices } from './choicesSlice.js';

export const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: (state, action) => state.push({ ...action.payload, id: htmlIdGenerator()() }),
    removeToast: (state, action) => state.filter((t) => t.id !== action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(getKeysAndSetChoices.rejected, (state, action) => [...state, { title: 'errors', text: action.payload, id: htmlIdGenerator()() }]);
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
