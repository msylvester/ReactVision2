// src/redux/slice.ts
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'example', // This name can be customized
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = slice.actions;
export default slice.reducer;
