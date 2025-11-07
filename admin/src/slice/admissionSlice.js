// src/redux/slices/admissionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
  callTimes: 0,
  message: '',
  data: [],
};

export const admissionSlice = createSlice({
  name: 'admission',
  initialState,
  reducers: {
    getAdmissions: (state) => {
      state.loading = true;
      state.error = null;
    },

    addAdmission: (state) => {
      state.loading = true;
      state.error = null;
    },

    removeAdmission: (state) => {
      state.loading = true;
      state.error = null;
    },

    successAdmission: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },

    failedAdmission: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAdmissions,
  addAdmission,
  removeAdmission,
  successAdmission,
  failedAdmission,
} = admissionSlice.actions;

export default admissionSlice.reducer;
