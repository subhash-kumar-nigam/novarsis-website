import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../apis/ApiInstence"; // ✅ API helper

// ============================
// Fetch all Services
// ============================
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    try {
      const res = await getRequest("service"); // ✅ endpoint: /api/v1/service
      console.log("Services API response:", res.data);
      return res.data.data || res.data; // ✅ handle both response formats
    } catch (error) {
      console.error("Failed to fetch services:", error);
      throw error;
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch services";
      });
  },
});

export default serviceSlice.reducer;
