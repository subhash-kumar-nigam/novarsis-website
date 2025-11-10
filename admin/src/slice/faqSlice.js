import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
  message: ''
};

const faqSlice = createSlice({
  name: 'faq', // ✅ Store key name
  initialState,
  reducers: {
    // 🔹 Start actions
    getFaqs: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOneFaq: (state) => {
      state.loading = true;
      state.error = null;
    },
    addFaq: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFaq: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeFaq: (state) => {
      state.loading = true;
      state.error = null;
    },

    // 🔹 Success & Failure
    successFaq: (state, action) => {
      state.loading = false;
      state.data = action.payload || [];
      state.error = null;
    },
    failedFaq: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    }
  }
});

export const { getFaqs, getOneFaq, addFaq, updateFaq, removeFaq, successFaq, failedFaq } = faqSlice.actions;

export default faqSlice.reducer;
