import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
//import FirmModal from "../components/FirmModal"
import TableSkeleton, {
  CardSkeleton,
  ErrorMessage,
  NoDataMessage,
} from "../components/DataFetchMessages"
import useBlogCalls from "../hooks/useBlogCalls"
import BlogCard from "../components/blog/BlogCard"

const Dashboard = () => {
  // const { axiosToken } = useAxios()
  // const { getFirms, getSales } = useStockRequest()
  const { getBlog } = useBlogCalls()
  const { blogs, loading, error } = useSelector((state) => state.blog)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  // const [info, setInfo] = useState({
  //   name: "",
  //   phone: "",
  //   image: "",
  //   address: "",
  // })

  // const handleClose = () => {
  //   setOpen(false)
  //   setInfo({
  //     name: "",
  //     phone: "",
  //     image: "",
  //     address: "",
  //   })
  // }

  useEffect(() => {
    getBlog("blogs")
  }, [])

  return (
    <div>
      {loading && (
        <CardSkeleton>
          <BlogCard />
        </CardSkeleton>
      )}

      {error && <ErrorMessage />}
      {!error && !blogs.length && <NoDataMessage />}
      {!error && !loading && blogs.length > 0 && (
        <Grid container gap={2} mt={3} justifyContent={"center"}>
          {blogs.map((blog) => (
            <Grid item key={blog._id}>
              <BlogCard blog={blog} handleOpen={handleOpen} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* <FirmModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      /> */}
    </div>
  )
}

export default Dashboard
