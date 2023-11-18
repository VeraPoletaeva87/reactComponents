import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/searchSlice';
import pageLimitReducer from './features/pageLimitSlice';
import listLoadedReducer from './features/listLoadedSlice';
import detailLoadedReducer from './features/detailLoadedSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    pageLimit: pageLimitReducer,
    listLoaded: listLoadedReducer,
    detailLoaded: detailLoadedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
