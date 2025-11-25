import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // list या single data
  loading: false,
  error: null
};

export const infrastructureSlice = createSlice({
  name: 'infrastructureSlice',
  initialState,
  reducers: {
    addInfrastructure: (state) => {
      state.loading = true;
    },
    getInfrastructures: (state) => {
      state.loading = true;
    },
    getOneInfrastructure: (state) => {
      state.loading = true;
    },
    updateInfrastructure: (state) => {
      state.loading = true;
    },
    removeInfrastructure: (state) => {
      state.loading = true;
    },

    successInfrastructure: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    failedInfrastructure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  addInfrastructure,
  getInfrastructures,
  getOneInfrastructure,
  updateInfrastructure,
  removeInfrastructure,
  successInfrastructure,
  failedInfrastructure
} = infrastructureSlice.actions;

export default infrastructureSlice.reducer;
