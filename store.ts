import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './src/features/formDataSlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;