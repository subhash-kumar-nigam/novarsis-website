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
      state.data = action.payload;
    },
    failedGallery: (state, action) => {
      state.error = action.payload; // store error message
    },
    removeGallery: () => {},
    updateGallery: () => {},
    emptyCart: (state, action) => {
      if (typeof state.value === 'number') {
        state.value += action.payload;
      }
    }
  }
});

// ✅ Export all actions
export const { addGallery, removeGallery, updateGallery, getGallery, successGallery, getOneGallery, failedGallery } = gallerySlice.actions;

export default gallerySlice.reducer;
