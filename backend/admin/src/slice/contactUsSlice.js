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

export const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {
    getDashboardData: () => {},
    getContactUs: () => {},
    removeContactUs: () => {},
    updateContactUs: (state, action) => {
      state.value += action.payload;
    },
    successContactUs: (state, action) => {
      console.log(state);
      state.data = action.payload;
    },
    failedContactUs: (state, action) => {
      state.value += action.payload;
    }
  }
});

// ✅ Action creators are generated for each case reducer function
export const { getContactUs, removeContactUs, updateContactUs, successContactUs, failedContactUs, getDashboardData } =
  contactUsSlice.actions;

export default contactUsSlice.reducer;
