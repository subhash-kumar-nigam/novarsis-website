import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload) => {
      state.loading = true;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSuccess(state, action) {
      state.loading = false;
      state.response = action.payload;
      state.error = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, getUserFailure, getSuccess } = authSlice.actions

export default authSlice.reducer