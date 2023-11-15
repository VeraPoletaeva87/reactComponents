import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  value: string;
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: { value: '' },
  reducers: {
    changSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changSearch } = searchSlice.actions;

export default searchSlice.reducer;
