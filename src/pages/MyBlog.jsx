import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  CardSkeleton,
  ErrorMessage,
} from "../components/DataFetchMessages";
import useBlogCalls from "../hooks/useBlogCalls";
import BlogCard from "../components/blog/BlogCard";

const MyBlog = () => {
  const { getUserBlogs } = useBlogCalls();
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    getUserBlogs("blogs");
  }, []);

  const handleWriteBlog = () => {
    navigate("/newblog");
  };

  return (
    <div>
      {loading && (
        <CardSkeleton>
          <BlogCard />
        </CardSkeleton>
      )}

      {error && <ErrorMessage />}
      {!error && !blogs.length && (
        <div>
          <Typography variant="h6" align="center">
            No blogs data...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWriteBlog}
            sx={{ display: "block", margin: "20px auto" }}
          >
            WRITE BLOG
          </Button>
        </div>
      )}
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
