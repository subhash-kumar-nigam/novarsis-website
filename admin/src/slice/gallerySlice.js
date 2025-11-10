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

export const gallerySlice = createSlice({
  name: 'gallerySliceName',
  initialState,
  reducers: {
    addGallery: () => {},
    getGallery: () => {},
    getOneGallery: () => {},
    successGallery: (state, action) => {
      console.log(state);
      state.data = action.payload;
    },
    removeGallery: () => {},
    updateGallery: () => {},
    emptyCart: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addGallery, removeGallery, updateGallery, getGallery, successGallery, getOneGallery } = gallerySlice.actions;

export default gallerySlice.reducer;
