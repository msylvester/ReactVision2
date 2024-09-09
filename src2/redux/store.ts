// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './slice'; // Updated path

export const store = configureStore({
  reducer: {
    example: sliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
