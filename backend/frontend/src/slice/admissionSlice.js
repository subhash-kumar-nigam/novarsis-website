// src/slice/admissionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../apis/ApiInstence";

// Async thunk for submitting admission form
export const submitAdmissionForm = createAsyncThunk(
  "admission/submitAdmissionForm",
  async (formData) => {
    const res = await postRequest("admission", formData);
    return res.data;
  }
);

const admissionSlice = createSlice({
  name: "admission",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearAdmissionStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAdmissionForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAdmissionForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitAdmissionForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearAdmissionStatus } = admissionSlice.actions;
export default admissionSlice.reducer;
