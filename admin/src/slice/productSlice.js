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

export const productSlice = createSlice({
  name: 'productSliceName',
  initialState,
  reducers: {
    addProduct: () => {},
    getProduct: () => {},
    getOneProduct: () => {},
    successProduct: (state, action) => {
      state.data = action.payload;
    },
    removeProduct: () => {},
    updateProduct: () => {},
    emptyCart: (state, action) => {
      state.value += action.payload;
    },
    searchProductByName: () => {}
  }
});

// Action creators
export const { addProduct, removeProduct, updateProduct, getProduct, successProduct, getOneProduct, searchProductByName } =
  productSlice.actions;

export default productSlice.reducer;
