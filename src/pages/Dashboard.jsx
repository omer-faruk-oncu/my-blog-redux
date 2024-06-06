import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import TableSkeleton, {
  CardSkeleton,
  ErrorMessage,
  NoDataMessage,
} from "../components/DataFetchMessages";
import useBlogCalls from "../hooks/useBlogCalls";
import BlogCard from "../components/blog/BlogCard";

const Dashboard = () => {
  const { getBlog } = useBlogCalls();
  const { blogs, loading, error } = useSelector((state) => state.blog);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);

  useEffect(() => {
    getBlog("blogs");
  }, []);

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
              <BlogCard blog={blog}/>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
