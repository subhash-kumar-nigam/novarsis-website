import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../apis/ApiInstence"; // ✅ Your API helper

// ============================
// Fetch all Career Jobs
// ============================
export const fetchCareers = createAsyncThunk("career/fetchCareers", async () => {
  try {
    const res = await getRequest("career"); // ✅ endpoint: /api/v1/career
    console.log("Career API response:", res.data);
    return res.data.data || res.data; // ✅ handles both response formats
  } catch (error) {
    console.error("Failed to fetch careers:", error);
    throw error;
  }
});

const careerSlice = createSlice({
  name: "career",
  initialState: {
    careers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.careers = action.payload;
      })
      .addCase(fetchCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch career data";
      });
  },
});

export default careerSlice.reducer;
