import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

import TableSkeleton, {
  CardSkeleton,
  ErrorMessage,
  NoDataMessage,
} from "../components/DataFetchMessages";
import useBlogCalls from "../hooks/useBlogCalls";
import BlogCard from "../components/blog/BlogCard";

const MyBlog = () => {
  const { getUserBlogs } = useBlogCalls();
  const { blogs, loading, error } = useSelector((state) => state.blog);
   const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (user) {
      getUserBlogs(); 
    }
  }, [user]); 


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
    </div>
  );
};

export default MyBlog;
