import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
  categories: [],
  comments: [],
  loading: false,
  error: false,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    
    getBlogSuccess: (state, { payload: { path, blogData } }) => {
      state.loading = false;
      state[path] = blogData;
    },
    getCommentsSuccess: (state, action) => {
      state.loading = false;
      state.comments[action.payload.blogId] = action.payload.comments;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments[action.payload.blogId].push(action.payload.comment);
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getBlogSuccess,
  getCommentsSuccess,
  addCommentSuccess,
} = blogSlice.actions;

export default blogSlice.reducer;
