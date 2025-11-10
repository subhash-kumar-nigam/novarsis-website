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

export const holidaySlice = createSlice({
  name: 'holidaySliceName',
  initialState,
  reducers: {
    addHoliday: () => {},
    getHolidays: () => {},
    getOneHoliday: () => {},

    successHoliday: (state, action) => {
      state.data = action.payload;
    },
    removeHoliday: () => {},
    updateHoliday: () => {},
    failedHoliday: (state, action) => {
      state.response += action.payload;
    }
  }
});

export const { addHoliday, removeHoliday, updateHoliday, getHolidays, successHoliday, getOneHoliday, failedHoliday } = holidaySlice.actions;

export default holidaySlice.reducer;
