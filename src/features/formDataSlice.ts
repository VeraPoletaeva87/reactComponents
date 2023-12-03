import { CaseReducer, SliceCaseReducers, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
    name: string,
    age: number,
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

export interface FormDataReducer extends SliceCaseReducers<FormDataState> {
  saveForm: CaseReducer<FormDataState, PayloadAction<FormData>>;
}

export const formDataSlice = createSlice<FormDataState, FormDataReducer>({
  name: 'formData',
  initialState: { value: [] },
  reducers: {
    saveForm: (state, { payload }) => {
      state.value = [...state.value, payload ];
    },
  },
});

export const { saveForm } = formDataSlice.actions;

export default formDataSlice.reducer;