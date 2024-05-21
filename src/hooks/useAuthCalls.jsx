
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
} from "../features/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useAxios from "./useAxios"


const useAuthCalls = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { axiosToken, axiosPublic } = useAxios()
  const { token } = useSelector((state) => state.auth)
  const login = async (userData) => {
    

    dispatch(fetchStart())
    try {
     
      const { data } = await axiosPublic.post("/auth/login/", userData)
      dispatch(loginSuccess(data))
      toastSuccessNotify("Login işlemi başarılı")
      navigate("/blog")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Login başarısız oldu")
      console.log(error)
    }
  }

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      
      const { data } = await axiosPublic.post("/users/", userInfo)
      dispatch(registerSuccess(data))
      navigate("/blog")
    } catch (error) {
      dispatch(fetchFail())
    }
  }
  const logout = async () => {
    dispatch(fetchStart())
    try {
      await axiosToken.get("/auth/logout")
      dispatch(logoutSuccess())
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  return { login, register, logout }
}

export default useAuthCalls
