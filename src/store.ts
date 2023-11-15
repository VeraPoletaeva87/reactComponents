import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/searchSlice';
import pageLimitReducer from './features/pageLimitSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    pageLimit: pageLimitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
