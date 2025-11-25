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

export const applyFormSlice = createSlice({
  name: 'applyForm',
  initialState,
  reducers: {
    getApplyForm: () => {},
    removeApplyForm: () => {},
    updateApplyForm: (state, action) => {
      state.value += action.payload;
    },
    successApplyForm: (state, action) => {
      console.log(state);
      state.data = action.payload;
    },
    failedApplyForm: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Export actions
export const { getApplyForm, removeApplyForm, updateApplyForm, successApplyForm, failedApplyForm } = applyFormSlice.actions;

// Export reducer
export default applyFormSlice.reducer;
