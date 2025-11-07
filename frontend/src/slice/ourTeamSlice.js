
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../apis/ApiInstence";


export const fetchTeamMembers = createAsyncThunk(
  "team/fetchTeamMembers",
  async () => {
    
    const res = await getRequest("ourteam");
    console.log("API response:", res.data); 
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    members: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.members = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch team members";
      });
  },
});

export default teamSlice.reducer;
