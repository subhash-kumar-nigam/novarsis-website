import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
  callTimes: 0,
  message: '',
  isLogin: false,
  token: null,
};

// Load user data from localStorage
try {
  const userData = localStorage.getItem('user');
  if (userData && userData !== 'undefined') {
    const parsedUser = JSON.parse(userData);
    initialState.response = parsedUser;
    initialState.token = parsedUser?.access_token || null;
    initialState.isLogin = true;
  }
} catch (error) {
  initialState.response = null;
  initialState.isLogin = false;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, { payload }) => {
      state.loading = true;
      state.callTimes++;
    },
    signin: (state, { payload }) => {
      state.loading = true;
      state.callTimes++;
    },
    failed: (state, { payload }) => {
      console.log(payload);
      state.error = true;
      state.loading = false;
      state.message = payload?.data?.message || "Something went wrong.";
      state.response = [];
    },
    getoneuser: (state, { payload }) => {
      state.callTimes++;
    },
    successLogin: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload?.data));
      localStorage.setItem('token', payload?.data?.access_token);
      state.loading = false;
      state.response = payload?.data;
      state.message = payload.message || "Login successful";
      state.token = payload?.data?.access_token;
      state.error = null;
      state.isLogin = true;
    },
    success: (state, { payload }) => {
      state.loading = false;
      state.response = payload?.data;
      state.message = payload.message || "Success";
      state.token = payload?.data?.access_token;
      state.error = null;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.response = [];
      state.loading = false;
      state.message = 'Logout Successfully';
      state.isLogin = false;
      state.token = null;
    },
    otpverification: (state) => {
      state.loading = true;
    },
  },
});

export const {
  signup,
  signin,
  success,
  failed,
  logout,
  otpverification,
  successLogin,
  getoneuser,
} = userSlice.actions;

export default userSlice.reducer;