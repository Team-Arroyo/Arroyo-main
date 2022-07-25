/* eslint-disable import/extensions */
import { createSlice } from '@reduxjs/toolkit';
import {
  htmlIdGenerator,
} from '@elastic/eui';

export const tostSlice = createSlice({
  name: 'toasts',
  initialState: [
    {
      title: 'testing a toast',
      text: 'this is where content goes',
      id: htmlIdGenerator()(),
    },
  ],
  reducers: {
    addToast: (state, action) => state.push({ ...action.payload, id: htmlIdGenerator()() }),
    removeToast: (state, action) => state.filter((t) => t.id !== action.payload),
  },
});

export const { addToast, removeToast } = tostSlice.actions;

export default tostSlice.reducer;
