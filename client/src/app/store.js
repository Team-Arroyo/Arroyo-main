/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '../features/dateRangeSlice.js';
import queryReducer from '../features/queriesSlice.js';
import choiceReducer from '../features/choicesSlice.js';
import toastReducer from '../features/toastSlice.js';

export default configureStore({
  reducer: {
    dateRange: dateReducer,
    queries: queryReducer,
    choices: choiceReducer,
    toasts: toastReducer,
  },
});
