import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  categories: [],
  status: [],
  comments: {},
  loading: false,
  error: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBlogSuccess: (state, { payload: { path, stockData } }) => {
      state.loading = false;
      state[path] = stockData;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getCommentsSuccess: (state, { payload: { blogId, comments } }) => {
      state.comments[blogId] = comments;
      state.loading = false;
    },
    addCommentSuccess: (state, { payload: { blogId, comment } }) => {
      state.comments[blogId].push(comment);
    },
  },
});

export const { fetchStart, getBlogSuccess, fetchFail, getCommentsSuccess, addCommentSuccess } = blogSlice.actions;

export default blogSlice.reducer;
