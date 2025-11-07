import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../apis/ApiInstence";

// ✅ Async thunk for submitting Apply Form
export const submitApplyForm = createAsyncThunk(
  "applyForm/submitApplyForm",
  async (formData) => {
    const res = await postRequest("apply", formData); // API: api/v1/apply
    return res.data;
  }
);

const applyFormSlice = createSlice({
  name: "applyForm",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearApplyFormStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplyForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitApplyForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitApplyForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearApplyFormStatus } = applyFormSlice.actions;
export default applyFormSlice.reducer;
