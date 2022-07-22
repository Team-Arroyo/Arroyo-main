/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const queriesSlice = createSlice({
  name: 'queries',
  initialState: {},
  reducers: {
    addQuery: (state, action) => {
      const currentKeys = Object.keys(state);
      const { column, columnValue } = action.payload;
      if (!column.trim() || !columnValue.trim()) {
        return;
      }
      if (Object.keys(state).length >= 2 && !currentKeys.includes(column)) {
        return;
      }
      // eslint-disable-next-line no-param-reassign
      state[column] = columnValue;
    },
    removeQuery: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      delete state[action.payload];
    },
  },
});

export const { addQuery, removeQuery } = queriesSlice.actions;

export default queriesSlice.reducer;
