// src/slice/eventSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState,
  reducers: {
    addEvent: () => {},
    getEvent: () => {},
    getOneEvent: () => {},
    updateEvent: () => {},
    removeEvent: () => {},

    successEvent: (state, action) => {
      state.data = action.payload;
    },
    failedEvent: (state, action) => {
      state.response = action.payload;
    }
  }
});

export const { addEvent, getEvent, getOneEvent, updateEvent, removeEvent, successEvent, failedEvent } = eventSlice.actions;

export default eventSlice.reducer;
