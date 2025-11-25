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

export const customerSlice = createSlice({
  name: 'customerSliceName',
  initialState,
  reducers: {
    addCustomer: () => {},
    getCustomer: () => {},
    getOneCustomer: () => {},

    successCustomer: (state, action) => {
      console.log(state);
      state.data = action.payload;
    },
    searchByMobile: () => {},
    removeCustomer: () => {},
    updateCustomer: () => {}
  }
});

// Action creators are generated for each case reducer function
export const { addCustomer, removeCustomer, updateCustomer, getCustomer, successCustomer, getOneCustomer, searchByMobile } =
  customerSlice.actions;

export default customerSlice.reducer;
