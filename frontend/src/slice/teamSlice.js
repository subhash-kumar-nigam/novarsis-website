import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../apis/ApiInstence"; // ✅ API helper

// ============================
// Fetch all Team Members
// ============================
export const fetchTeam = createAsyncThunk("team/fetchTeam", async () => {
  try {
    const res = await getRequest("team"); // ✅ endpoint: /api/v1/team
    console.log("Team API response:", res.data);
    return res.data.data || res.data; // handles both response formats
  } catch (error) {
    console.error("Failed to fetch team:", error);
    throw error;
  }
});

const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch team data";
      });
  },
});

export default teamSlice.reducer;
