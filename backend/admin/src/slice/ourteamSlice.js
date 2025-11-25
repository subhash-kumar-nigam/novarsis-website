import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  singleData: null,
  loading: false,
  error: null
};

export const ourteamSlice = createSlice({
  name: 'ourteam',
  initialState,
  reducers: {
    addOurteam: (state) => {
      state.loading = true;
    },
    getOurteam: (state) => {
      state.loading = true;
    },
    getOneOurteam: (state) => {
      state.loading = true;
    },
    updateOurteam: (state) => {
      state.loading = true;
    },
    removeOurteam: (state) => {
      state.loading = true;
    },
    successOurteam: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    successOneOurteam: (state, action) => {
      state.singleData = action.payload;
      state.loading = false;
      state.error = null;
    },
    failedOurteam: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { addOurteam, getOurteam, getOneOurteam, updateOurteam, removeOurteam, successOurteam, successOneOurteam, failedOurteam } =
  ourteamSlice.actions;

export default ourteamSlice.reducer;
