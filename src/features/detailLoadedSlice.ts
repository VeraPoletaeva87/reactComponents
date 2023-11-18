import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DetailLoadedState {
  value: boolean;
}

export const detailLoadedSlice = createSlice({
  name: 'detailLoaded',
  initialState: { value: false },
  reducers: {
    changeDetailLoaded: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { changeDetailLoaded } = detailLoadedSlice.actions;

export default detailLoadedSlice.reducer;
