import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
  callTimes : 0,
  message:'',
  token:null
};

const userData = localStorage.getItem('user') ? localStorage.getItem('user') : null ;
if(userData){
    initialState.response =  JSON.parse(userData);
    initialState.token = userData?.data?.access_token;
}else{
    initialState.response =  null;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup : (state) => {
        state.callTimes++;
    },
    signin :(state) =>  {
        state.callTimes++;
    },
    failed: (state, {payload}) => {
        state.error = true;
        state.loading = false;
        state.message = payload.message;
    },

    success : (state, {payload})=>{
        localStorage.setItem('user', JSON.stringify(payload?.data?.name))
        localStorage.setItem('token', payload?.data?.access_token)
        state.loading = false;
        state.response = payload;
        state.message = payload.message;
        state.token = payload?.data?.access_token;
        state.error = null;
    },
    logout : (state)=>{
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.response = [];
      state.loading = false;
      state.message = 'Logout Successfully';
  }
  },
})

// Action creators are generated for each case reducer function
export const { signup, signin, success, failed, logout } = userSlice.actions

export default userSlice.reducer