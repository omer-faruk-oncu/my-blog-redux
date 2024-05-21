import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  blogs: [],
  categories: [],
  status: [],
  loading: false,
  error: false,
}

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
      state.error = false
    },
    // getFirmsSuccess: (state, { payload }) => {
    //   state.loading = false
    //   state.firms = payload
    // },
    // getSalesSuccess: (state, { payload }) => {
    //   state.loading = false
    //   state.sales = payload
    // },

  
    // getStockSuccess: (state, action) => {
    //   state.loading = false
    //   state[action.payload.path] = action.payload.stockData
    // },

    getBlogSuccess: (state, { payload: { path, stockData } }) => {
      state.loading = false
      state[path] = stockData
      //state.error = false
    },

   

    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const {
  fetchStart,
  getBlogSuccess,
  fetchFail,
} = blogSlice.actions

export default blogSlice.reducer
