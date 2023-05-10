import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import jobBoardReducer from './slices/jobBoardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    jobBoard: jobBoardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
