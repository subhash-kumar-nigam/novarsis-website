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

export const busSlice = createSlice({
  name: 'busSliceName',
  initialState,
  reducers: {
    addBus: () => {},
    getBuses: () => {},
    getOneBus: () => {},

    successBus: (state, action) => {
      state.data = action.payload;
    },
    removeBus: () => {},
    updateBus: () => {},
    failedBus: (state, action) => {
      state.response += action.payload;
    }
  }
});

export const { addBus, removeBus, updateBus, getBuses, successBus, getOneBus, failedBus } = busSlice.actions;

export default busSlice.reducer;
