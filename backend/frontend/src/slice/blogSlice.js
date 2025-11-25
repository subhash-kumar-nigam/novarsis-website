// src/slice/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../apis/ApiInstence"; // ensure this works for your API

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => {
    try {
      const res = await getRequest("blog"); // endpoint: /api/v1/blog
      console.log("Blogs API response:", res.data);
      return res.data.data || res.data; // ✅ handle both cases
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      throw error;
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {
    // optional: add local reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      });
  },
});

export default blogSlice.reducer;
