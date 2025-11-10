import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // All fee records
  single: null, // Single fee record for update/view
  loading: false,
  error: null
};

const feesSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {
    // Trigger sagas / async operations
    getFees: (state) => {
      state.loading = true;
    },
    getOneFee: (state) => {
      state.loading = true;
    },
    addFee: (state) => {
      state.loading = true;
    },
    updateFee: (state) => {
      state.loading = true;
    },
    removeFee: (state) => {
      state.loading = true;
    },

    // Saga success / failure
    successFees: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    successOneFee: (state, action) => {
      state.loading = false;
      state.single = action.payload;
      state.error = null;
    },
    failedFees: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getFees, getOneFee, addFee, updateFee, removeFee, successFees, successOneFee, failedFees } = feesSlice.actions;

export default feesSlice.reducer;
