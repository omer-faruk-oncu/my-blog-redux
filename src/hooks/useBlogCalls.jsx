import { useDispatch } from "react-redux"
import useAxios from "./useAxios"
import {
  fetchFail,
  fetchStart,
  getBlogSuccess,
} from "../features/blogSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"

const useBlogCalls = () => {
  const { axiosToken } = useAxios()
  const dispatch = useDispatch()

  // const getFirms = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const { data } = await axiosToken("/firms")
  //     dispatch(getFirmsSuccess(data.data))
  //   } catch (error) {
  //     dispatch(fetchFail())
  //     console.log(error)
  //   }
  // }

  // const getSales = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const { data } = await axiosToken("/sales")
  //     dispatch(getSalesSuccess(data.data))
  //   } catch (error) {
  //     dispatch(fetchFail())
  //     console.log(error)
  //   }
  // }

  const getBlog = async (path = "blog") => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosToken(`/${path}`)
      const stockData = data.data
      dispatch(getBlogSuccess({ stockData, path }))
    } catch (error) {
      toastErrorNotify(`${path} verileri çekilememiştir.`)
      dispatch(fetchFail())
      console.log(error)
    }
  }

  const deleteBlog = async (path = "blogs", id) => {
    dispatch(fetchStart())
    try {
      await axiosToken.delete(`/${path}/${id}`)
      toastSuccessNotify(`${path} basariliyla silinmiştir.`)
      getBlog(path)
    } catch (error) {
      toastErrorNotify(`${path} silinememiştir.`)
      dispatch(fetchFail())
      console.log(error)
    }
  }

  const postBlog = async (path = "blogs", info) => {
    dispatch(fetchStart())
    try {
      await axiosToken.post(`/${path}/`, info)
      getBlog(path)
      toastSuccessNotify(`${path} basariliyla eklenmiştir.`)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${path} eklenememiştir.`)
      console.log(error)
    }
  }

  const putBlog = async (path = "blogs", info) => {
    dispatch(fetchStart())
    try {
      await axiosToken.put(`/${path}/${info._id}`, info)
      getBlog(path)
      toastSuccessNotify(`${path} basariliyla guncellenmiştir.`)
    } catch (error) {
      toastErrorNotify(`${path} guncellenememiştir.`)
      dispatch(fetchFail())
      console.log(error)
    }
  }

 


  return { getBlog, deleteBlog, postBlog, putBlog }
}

export default useBlogCalls
