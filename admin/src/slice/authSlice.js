import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
  token: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, payload) => {
      console.log('login stat ' + state.user, payload);
      state.loading = true;
    },
    getUserFailure: (state, action) => {
      console.log('failed', action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    getSuccess: (state, action) => {
      console.log('success', action.payload);
      state.loading = false;
      state.response = action.payload;
      state.token = action.payload?.response?.data?.access_token;
      state.error = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { login, getUserFailure, getSuccess } = authSlice.actions;

export default authSlice.reducer;
