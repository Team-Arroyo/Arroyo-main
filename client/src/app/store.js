/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '../features/dateRangeSlice.js';

export default configureStore({
  reducer: {
    dateRange: dateReducer,
    // queries: queriesReducer,
    // choices: choicesReducer,
  },
});
