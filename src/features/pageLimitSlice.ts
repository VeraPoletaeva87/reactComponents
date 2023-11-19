import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PageLimitState {
  value: number;
}

export const pageLimitSlice = createSlice({
  name: 'pageLimit',
  initialState: { value: 10 },
  reducers: {
    changPageLimit: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { changPageLimit } = pageLimitSlice.actions;

export default pageLimitSlice.reducer;
