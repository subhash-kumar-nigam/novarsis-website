import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, { payload }) => {
      state.push(payload);
    },
    removeOrder: (state) => {
      state.value -= 1;
    },
    emptyCart: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addOrder, removeOrder, emptyCart } = orderSlice.actions;

export default orderSlice.reducer;
