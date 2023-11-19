import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/searchSlice';
import pageLimitReducer from './features/pageLimitSlice';
import listLoadedReducer from './features/listLoadedSlice';
import detailLoadedReducer from './features/detailLoadedSlice';
import { beerApi } from './features/apiSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    pageLimit: pageLimitReducer,
    listLoaded: listLoadedReducer,
    detailLoaded: detailLoadedReducer,
    [beerApi.reducerPath]: beerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(beerApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
