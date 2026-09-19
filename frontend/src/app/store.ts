import { configureStore } from '@reduxjs/toolkit';
import reportsReducer from '../store/slices/reportSlice';
import authReducer from '../store/slices/authSlice';

export const store = configureStore({
  reducer: {
    reports: reportsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;