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

export const awardSlice = createSlice({
  name: 'awardSliceName',
  initialState,
  reducers: {
    addAward: () => {},
    getAwards: () => {},
    getOneAward: () => {},

    successAward: (state, action) => {
      console.log(state);
      state.data = action.payload;
    },
    removeAward: () => {},
    updateAward: () => {},
    failedAward: (state, action) => {
      state.response += action.payload;
    }
  }
});

export const { addAward, removeAward, updateAward, getAwards, successAward, getOneAward, failedAward } = awardSlice.actions;

// ✅ Reducer export
export default awardSlice.reducer;
