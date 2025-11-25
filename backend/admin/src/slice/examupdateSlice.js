import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
  callTimes: 0,
  message: '',
  data: []
};

export const examupdateSlice = createSlice({
  name: 'examupdateSliceName',
  initialState,
  reducers: {
    // Actions for saga to listen to
    addExamupdate: () => {},
    getExamupdates: () => {},
    getOneExamupdate: () => {},
    removeExamupdate: () => {},
    updateExamupdate: () => {},

    // Common reducers
    successExamupdate: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    failedExamupdate: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  addExamupdate,
  getExamupdates,
  getOneExamupdate,
  removeExamupdate,
  updateExamupdate,
  successExamupdate,
  failedExamupdate,
  setLoading
} = examupdateSlice.actions;

export default examupdateSlice.reducer;
