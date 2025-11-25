import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getRequest, postRequest } from "../apis/ApiInstence";

export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
  const res = await getRequest("job");
  return res.data;
});

export const addJob = createAsyncThunk("job/addJob", async (jobData) => {
  const res = await postRequest("job", jobData)
  return res.data;
});

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchJobs.pending, state => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload); // Add new job to local state
      });
  },
});

export default jobSlice.reducer;
