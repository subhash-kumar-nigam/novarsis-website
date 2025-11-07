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

export const internshipSlice = createSlice({
  name: 'internship',
  initialState,
  reducers: {
    getDashboardDataa: (state) => {
      state.loading = true;
      state.error = null;
    },
    getResume: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeResume: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateResume: (state, action) => {
      // Assuming you're updating specific resume here
      const updated = action.payload;
      const index = state.data.findIndex((item) => item.id === updated.id);
      if (index !== -1) {
        state.data[index] = updated;
      }
    },
    successResume: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    failedResume: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getResume,
  removeResume,
  updateResume,
  successResume,
  failedResume,
  getDashboardDataa,
} = internshipSlice.actions;

export default internshipSlice.reducer;
