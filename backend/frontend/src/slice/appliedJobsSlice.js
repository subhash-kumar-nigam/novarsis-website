import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postRequest } from "../../apis/ApiInstence";

// Async thunk to fetch applied jobs
export const fetchAppliedJobs = createAsyncThunk(
  "appliedJobs/fetchAppliedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRequest("applynow"); // Replace with actual endpoint
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to submit a new job application (optional)
export const applyToJob = createAsyncThunk(
  "appliedJobs/applyToJob",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postRequest("applynow", payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const appliedJobsSlice = createSlice({
  name: "appliedJobs",
  initialState: {
    loading: false,
    jobs: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load applications";
      });

    builder
      .addCase(applyToJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyToJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Application failed";
      });
  },
});

export default appliedJobsSlice.reducer;
