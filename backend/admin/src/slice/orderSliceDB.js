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

export const orderSliceDB = createSlice({
  name: 'orderSlicedb',
  initialState,
  reducers: {
    getOrderListDB: (state) => {
      console.log(state);
    },
    getOrderDeatilsDB: (state) => {
      console.log(state);
    },
    addOrderListDB: (state) => {
      console.log(state);
    },
    removeOrderListDB: (state) => {
      console.log(state);
    },
    updateOrderListDB: (state, action) => {
      state.value += action.payload;
    },
    successOrderListDB: (state, action) => {
      console.log(state);
      state.data = action.payload;
    },
    failedOrderListDB: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const {
  getOrderListDB,
  getOrderDeatilsDB,
  addOrderListDB,
  removeOrderListDB,
  updateOrderListDB,
  successOrderListDB,
  failedOrderListDB
} = orderSliceDB.actions;

export default orderSliceDB.reducer;
