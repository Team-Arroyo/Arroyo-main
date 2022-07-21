/* eslint-disable import/extensions */
import { createSlice } from '@reduxjs/toolkit';

export const choiceSlice = createSlice({
  name: 'choices',
  initialState: [],
  reducers: {
    setChoices: (state, action) => [...action.payload],
  },
});

export const { setChoices } = choiceSlice.actions;

export default choiceSlice.reducer;
