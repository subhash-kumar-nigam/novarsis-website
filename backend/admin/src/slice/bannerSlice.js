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

export const bannerSlice = createSlice({
  name: 'bannerSliceName',
  initialState,
  reducers: {
    addBanner: () => {},
    getBanner: () => {},
    getOneBanner: () => {},

    successBanner: (state, action) => {
      console.log(state);
      state.data = action.payload;
    },
    removeBanner: () => {},
    updateBanner: () => {}
  }
});

// Action creators are generated for each case reducer function
export const { addBanner, removeBanner, updateBanner, getBanner, successBanner, getOneBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
