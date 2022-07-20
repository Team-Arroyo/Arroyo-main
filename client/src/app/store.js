import { configureStore } from '@reduxjs/toolkit'
import dateReducer from '../slices/dateRangeSlice'

export default configureStore({
  reducer: {
    dateRange: dateReducer,
    // queries: queriesReducer,
    // choices: choicesReducer,
  }
})