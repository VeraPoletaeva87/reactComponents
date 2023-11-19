import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://api.punkapi.com/v2/beers';

export interface ListItem {
  id: number;
  name: string;
  description: string;
}

export interface BeerItem {
  name: string;
  description: string;
  tagline: string;
}

export const beerApi = createApi({
  reducerPath: 'beerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getBeers: builder.query<ListItem[], { url: string; limit: number }>({
      query: (params: { url: string; limit: number }) =>
        `${params.url}&${params.limit && `_limit=${params.limit}`}`,
    }),
    getBeerById: builder.query<BeerItem[], string>({
      query: (id) => `/?ids=${id}`,
    }),
  }),
});

export const { useGetBeersQuery, useGetBeerByIdQuery } = beerApi;
