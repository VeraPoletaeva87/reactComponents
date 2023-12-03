import { CaseReducer, SliceCaseReducers, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CountryState {
   value: string[];
}

export interface CountryReducer extends SliceCaseReducers<CountryState> {
  saveCountries: CaseReducer<CountryState, PayloadAction<string[]>>;
}

export const countrySlice = createSlice<CountryState, CountryReducer>({
  name: 'countries',
  initialState: { value: [] },
  reducers: {
    saveCountries: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { saveCountries } = countrySlice.actions;

export default countrySlice.reducer;