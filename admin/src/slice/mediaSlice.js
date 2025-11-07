import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  response: null,
  loading: false,
  error: null,
  callTimes: 0,
  message: '',
  data: []
}

export const mediaSlice = createSlice({
  name: 'mediaSliceName',
  initialState,
  reducers: {
    addMedia: () => {

    },
    getMedia: () => {

    },
    getOneMedia: () => {

    },

    successMedia: (state, action) => {
      console.log(state)
      state.data = action.payload
  },
    removeMedia: () => {
    },
    updateMedia: () => {
    },
    emptyCart: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addMedia, removeMedia, updateMedia, getMedia, successMedia, getOneMedia } = mediaSlice.actions

export default mediaSlice.reducer