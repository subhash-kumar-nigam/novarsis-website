import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // list of fee structures
  loading: false,
  error: null
};

const feeStructureSlice = createSlice({
  name: 'feeStructure',
  initialState,
  reducers: {
    // Action triggers
    getFeeStructures: () => {},
    getOneFeeStructure: () => {},
    addFeeStructure: () => {},
    updateFeeStructure: () => {},
    removeFeeStructure: () => {},

    // Success actions
    successFeeStructure: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedFeeStructure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  getFeeStructures,
  getOneFeeStructure,
  addFeeStructure,
  updateFeeStructure,
  removeFeeStructure,
  successFeeStructure,
  failedFeeStructure,
  setLoading
} = feeStructureSlice.actions;

export default feeStructureSlice.reducer;
