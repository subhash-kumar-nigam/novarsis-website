// src/redux/slices/careerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const careerSlice = createSlice({
  name: 'careerSlice',
  initialState,
  reducers: {
    // Actions for CRUD
    addCareer: () => {},
    getCareer: () => {},
    getOneCareer: () => {},
    updateCareer: () => {},
    removeCareer: () => {},

    // Reducers to handle success/failure
    successCareer: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    failedCareer: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { addCareer, getCareer, getOneCareer, updateCareer, removeCareer, successCareer, failedCareer } = careerSlice.actions;

export default careerSlice.reducer;
