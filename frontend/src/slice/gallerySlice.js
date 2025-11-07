import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../apis/ApiInstence";

// Async action to fetch gallery images
export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  async () => {
    const res = await getRequest("gallery"); // Backend endpoint: /api/v1/gallery
    return res.data; // Make sure backend returns an array of images
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.images = action.payload;
        state.loading = false;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch gallery";
      });
  },
});

export default gallerySlice.reducer;
