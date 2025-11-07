import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
};

export const contactUs = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {
    addContectUs: (state, payload) => {
      state.loading = true;
    },
    success: (state, {payload})=>{
        state.loading = false;
        state.response = payload
        return state
      },
      failed:(state)=>{
        state.loading = false;
        state.response = null;
      }
  },
})

// Action creators are generated for each case reducer function
export const { addContectUs, success, failed } = contactUs.actions

export default contactUs.reducer