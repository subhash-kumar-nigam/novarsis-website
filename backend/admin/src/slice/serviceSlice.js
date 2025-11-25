// src/redux/slices/serviceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const serviceSlice = createSlice({
  name: 'serviceSlice',
  initialState,
  reducers: {
    // CRUD actions
    addService: () => {},
    getService: () => {},
    getOneService: () => {},
    updateService: () => {},
    removeService: () => {},

    // Reducers
    successService: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    failedService: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { addService, getService, getOneService, updateService, removeService, successService, failedService } = serviceSlice.actions;

export default serviceSlice.reducer;
