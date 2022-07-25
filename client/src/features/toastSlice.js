/* eslint-disable max-len */
/* eslint-disable import/extensions */
import { createSlice } from '@reduxjs/toolkit';
import {
  htmlIdGenerator,
} from '@elastic/eui';
import { hasChoices } from '../libs/utils.js';
import { getKeysAndSetChoices } from './choicesSlice.js';

export const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    addToast: (state, action) => state.push({ ...action.payload, id: htmlIdGenerator()() }),
    removeToast: (state, action) => state.filter((t) => t.id !== action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(getKeysAndSetChoices.rejected, (state, action) => [...state, { title: 'Error: Filtering unsuccessful', text: action.payload, id: htmlIdGenerator()() }]);
    builder.addCase((getKeysAndSetChoices.fulfilled && hasChoices), (state, action) => [...state, { title: 'Error', text: `No files found in provided date range.\n${action.payload}`, id: htmlIdGenerator()() }]);
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
