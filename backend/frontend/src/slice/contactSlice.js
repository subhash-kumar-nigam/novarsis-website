// src/slice/contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { postRequest } from "../apis/ApiInstence";

// API call using createAsyncThunk
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData) => {
    const res = await postRequest("contactus", formData);
    return res.data;
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearContactStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
