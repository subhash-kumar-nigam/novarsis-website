// src/redux/slices/highlightSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const highlightSlice = createSlice({
  name: 'highlight',
  initialState,
  reducers: {
    addHighlight: (state) => {
      state.loading = true;
    },
    getHighlight: (state) => {
      state.loading = true;
    },
    getOneHighlight: (state) => {
      state.loading = true;
    },
    updateHighlight: (state) => {
      state.loading = true;
    },
    removeHighlight: (state) => {
      state.loading = true;
    },

    successHighlight: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    failedHighlight: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { addHighlight, getHighlight, getOneHighlight, updateHighlight, removeHighlight, successHighlight, failedHighlight } =
  highlightSlice.actions;

export default highlightSlice.reducer;
