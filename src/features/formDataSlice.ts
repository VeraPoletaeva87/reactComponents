import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
    name: string,
    age: string,
    email: string,
    password: string,
    confirm: string,
    gender: string,
    accept: string,
    image: string,
    country: string
  }

export interface FormDataState {
   value: FormData[];
}

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: { value: [] },
  reducers: {
    saveForm: (state, action: PayloadAction<FormData>) => {
       return { ...state, value: [...state.value, action.payload]}
    },
  },
});

export const { saveForm } = formDataSlice.actions;

export default formDataSlice.reducer;