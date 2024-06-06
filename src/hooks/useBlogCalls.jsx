import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  addCommentSuccess,
  fetchFail,
  fetchStart,
  getBlogSuccess,
  getCommentsSuccess,
} from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useBlogCalls = () => {
  const { axiosToken } = useAxios();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blog);

  const getBlog = async (path = "blogs") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/${path}?page=1&limit=50`);
      const blogData = data.data;
      console.log("fetched blogs:", blogData);
      dispatch(getBlogSuccess({ blogData, path }));
    } catch (error) {
      toastErrorNotify(`${path} verileri çekilememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getUserBlogs = async (path = "blogs") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosToken.get(`/${path}?author=${user._id}`);
      const blogData = data.data;
      console.log("fetched blogs:", blogData);
      dispatch(getBlogSuccess({ blogData, path }));
    } catch (error) {
      toastErrorNotify(`Kullanıcı blogları çekilememiştir.`);
      dispatch(fetchFail());
      console.error(error);
    }
  };

  const postBlog = async (path = "blogs", info) => {
    dispatch(fetchStart());
    try {
      console.log("post info", info);
      const res = await axiosToken.post(`/${path}/`, info);
      getBlog(path);
      console.log("post blog res:", res);
      toastSuccessNotify(`${path} basariliyla eklenmiştir.`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${path} eklenememiştir.`);
      console.log(error);
    }
  };

  // const getBlogComments = async (blogId) => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axiosToken.get(`/comments?blogId=${blogId}`);
  //     dispatch(getCommentsSuccess({ blogId, comments: data.comments }));
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };

  // const addComment = async (blogId, comment) => {
  //   dispatch(fetchStart()); // Yorum ekleme işlemi başlatıldığında yüklenme durumu
  //   try {
  //     const { data } = await axiosToken.post(`/comments/`, { blogId, comment }); // Backend endpoint ve body formatı
  //     dispatch(addCommentSuccess({ blogId, comment: data.comment })); // Yorum başarılı bir şekilde eklendiğinde Redux state güncellenir
  //     toastSuccessNotify("Comment added successfully.");
  //   } catch (error) {
  //     console.error(
  //       "Error adding comment:",
  //       error.response?.data || error.message
  //     ); // Hata mesajlarını daha iyi görüntülemek için console log ekleniyor
  //     dispatch(fetchFail());
  //     toastErrorNotify("Failed to add comment.");
  //   }
  // };

  const deleteBlog = async (path = "blogs", id) => {
    dispatch(fetchStart());
    try {
      await axiosToken.delete(`/${path}/${id}`);
      toastSuccessNotify(`${path} basariliyla silinmiştir.`);
      getBlog(path);
    } catch (error) {
      toastErrorNotify(`${path} silinememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const putBlog = async (path = "blogs", info) => {
    dispatch(fetchStart());
    try {
      await axiosToken.put(`/${path}/${info._id}`, info);
      getBlog(path);
      toastSuccessNotify(`${path} basariliyla guncellenmiştir.`);
    } catch (error) {
      toastErrorNotify(`${path} guncellenememiştir.`);
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return {
    getBlog,
    deleteBlog,
    postBlog,
    putBlog,
    //getBlogComments,
    //addComment,
    getUserBlogs,
  };
};

export default useBlogCalls;
