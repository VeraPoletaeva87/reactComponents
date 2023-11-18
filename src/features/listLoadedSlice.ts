import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ListLoadedState {
  value: boolean;
}

export const listLoadedSlice = createSlice({
  name: 'listLoaded',
  initialState: { value: false },
  reducers: {
    changeListLoaded: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { changeListLoaded } = listLoadedSlice.actions;

export default listLoadedSlice.reducer;
