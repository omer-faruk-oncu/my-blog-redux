import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import BlogCard from "../components/blog/BlogCard";
import Pagination from "@mui/material/Pagination";
import {
  CardSkeleton,
  NoDataMessage,
} from "../components/DataFetchMessages";
import useBlogCalls from "../hooks/useBlogCalls";

const Dashboard = () => {
  const { getBlog } = useBlogCalls();
  const { blogs, loading} = useSelector((state) => state.blog);
  const [page, setPage] = useState(1); // Mevcut sayfa için state
  const blogsPerPage = 6;
  useEffect(() => {
    getBlog("blogs", page, blogsPerPage);
  }, [page]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div>
      {loading && (
        <CardSkeleton>
          <BlogCard />
        </CardSkeleton>
      )}
      {!loading && !blogs.length && <NoDataMessage />}
      {!loading && blogs.length > 0 && (
        <Grid container gap={2} mt={3} justifyContent={"center"}>
          {blogs
            .slice((page - 1) * blogsPerPage, page * blogsPerPage)
            .map((blog) => (
              <Grid item key={blog._id}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
        </Grid>
      )}
      <Grid container justifyContent="center" mt={5}>
        <Pagination
          count={Math.ceil(blogs.length / blogsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Grid>
    </div>
  );
};
export default Dashboard;
