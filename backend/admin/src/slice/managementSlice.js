import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const managementSlice = createSlice({
  name: 'managementSlice',
  initialState,
  reducers: {
    addManagement: () => {},
    getManagement: () => {},
    getOneManagement: () => {},
    updateManagement: () => {},
    removeManagement: () => {},
    successManagement: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    failedManagement: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { addManagement, getManagement, getOneManagement, updateManagement, removeManagement, successManagement, failedManagement } =
  managementSlice.actions;

export default managementSlice.reducer;
