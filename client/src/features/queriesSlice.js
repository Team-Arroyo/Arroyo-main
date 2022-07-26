/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
      state[column] = columnValue;
    },
    removeQuery: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const { addQuery, removeQuery } = queriesSlice.actions;

export default queriesSlice.reducer;
