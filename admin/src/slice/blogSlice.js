// src/redux/slices/blogSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    // Actions for CRUD
    addBlog: () => {},
    getBlog: () => {},
    getOneBlog: () => {},
    updateBlog: () => {},
    removeBlog: () => {},

    // Reducers to handle success/failure
    successBlog: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    failedBlog: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Optional: set loading state
    setLoadingBlog: (state) => {
      state.loading = true;
      state.error = null;
    }
  }
});

export const { addBlog, getBlog, getOneBlog, updateBlog, removeBlog, successBlog, failedBlog, setLoadingBlog } = blogSlice.actions;

export default blogSlice.reducer;
