import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
  callTimes: 0,
  message: '',
  data: []
};

export const enquireSlice = createSlice({
  name: 'enquire',
  initialState,
  reducers: {
    getEnquire: (state) => {
      console.log(state);
    },
    removeEnquire: (state) => {
      console.log(state);
    },
    updateEnquire: (state, action) => {
      state.value += action.payload;
    },
    successEnquire: (state, action) => {
      console.log(state);
      state.data = action.payload;
    },
    failedEnquire: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { getEnquire, removeEnquire, updateEnquire, successEnquire, failedEnquire } = enquireSlice.actions;

export default enquireSlice.reducer;
