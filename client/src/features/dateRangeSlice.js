import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { formatDate } from '../libs/utils.js';

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    start: formatDate(moment()),
    end: formatDate(moment()),
  },
  reducers: {
    setStartDate: (state, action) => ({ ...state, start: action.payload }),
    setEndDate: (state, action) => ({ ...state, end: action.payload }),
  },
});

export const { setStartDate, setEndDate } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;
