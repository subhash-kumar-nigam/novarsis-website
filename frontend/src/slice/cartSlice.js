// src/slice/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [], // ✅ used correctly in selector
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity += delta;
        if (item.quantity < 1) item.quantity = 1;
      }
    },
    placeOrder: (state) => {
      state.cartItems = []; 
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, placeOrder } = cartSlice.actions;
export default cartSlice.reducer;