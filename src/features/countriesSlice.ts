import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CountryState {
   value: string[];
}

export const countrySlice = createSlice({
  name: 'countries',
  initialState: { value: [] },
  reducers: {
    saveCountries: (state, action: PayloadAction<string[]>) => {
       return { ...state, value: [...action.payload] }
    },
  },
});

export const { saveCountries } = countrySlice.actions;

export default countrySlice.reducer;