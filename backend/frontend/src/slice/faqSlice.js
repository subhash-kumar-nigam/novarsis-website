// src/slice/faqSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../apis/ApiInstence";

// ============================
// Fetch all FAQs
// ============================
export const fetchFaqs = createAsyncThunk("faq/fetchFaqs", async () => {
  try {
    const res = await getRequest("faq"); // endpoint: /api/v1/faq
    console.log("FAQs API response:", res.data);
    return res.data?.data || []; // ✅ Return only the FAQ array
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    throw error;
  }
});

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.faqs = action.payload; // ✅ Now it's a clean array
        state.loading = false;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch FAQs";
      });
  },
});

export default faqSlice.reducer;
