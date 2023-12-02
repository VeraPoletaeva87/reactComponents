import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './src/features/formDataSlice';
import countryReducer from './src/features/countriesSlice';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    countries: countryReducer
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;