import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Avatar,
  Badge,
} from "@mui/material";
import UpdateModal from "../components/blog/UpdateModal";
import CommentCard from "../components/blog/CommentCard";
import useBlogCalls from "../hooks/useBlogCalls";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toastErrorNotify } from "../helper/ToastNotify";
import CommentForm from "../components/blog/CommentForm";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlog, deleteBlog, getBlogComments, getSingleBlog } = useBlogCalls();
  const { blogs, categories, comments, singleBlog } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [open, setOpen] = useState(false);
  const [showCommetForm, setShowCommentForm] = useState(false);

  console.log(blogs)


  useEffect(() => {
    getSingleBlog(id);
    getBlog("categories");
    const blog = blogs.find((blog) => blog._id === id);
    setSelectedBlog(blog);
   getBlogComments()
  }, []);

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    deleteBlog("blogs", selectedBlog._id);
    navigate("/myblog");
  };

  const handleCommentForm = () => {
    setShowCommentForm(!showCommetForm);
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: 8,
        maxWidth: "60%",
        margin: "0 auto",
      }}
    >
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {selectedBlog && (
          <>
            <Typography variant="h4" color="primary.main" gutterBottom>
              {selectedBlog.title}
            </Typography>
            <Stack alignItems="center">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                width="100%"
              />
            </Stack>

            <Stack direction="row" gap={2} alignItems="center" mt={5}>
              <Avatar />
              <Box textAlign="center">
                <Typography variant="body1">{singleBlog?.userId?.username}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(selectedBlog.createdAt).toLocaleDateString("tr-TR")}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {selectedBlog.content}
            </Typography>

            <Stack
              mt={3}
              direction="row"
              gap={3}
              alignItems="center"
              color="text.secondary"
            >
              <Badge badgeContent={selectedBlog?.likes.length} color="primary">
                <FavoriteBorderIcon />
              </Badge>
              <Stack direction="row" alignItems="center">
                <Badge
                  badgeContent={selectedBlog?.comments.length}
                  color="primary"
                >
                  <ChatBubbleOutlineIcon onClick={handleCommentForm} />
                </Badge>
              </Stack>
              <Badge
                badgeContent={selectedBlog?.countOfVisitors}
                color="primary"
              >
                <VisibilityIcon />
              </Badge>
            </Stack>

            {user?._id === selectedBlog.userId && (
              <Stack
                direction="row"
                gap={5}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 5 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update Blog
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Delete Blog
                </Button>
              </Stack>
            )}

            <UpdateModal
              open={open}
              handleClose={() => setOpen(false)}
              blog={selectedBlog}
              categories={categories}
            />

            {showCommetForm && <CommentForm blogId={selectedBlog._id} />}

            <Box mt={3}>
            {comments
                .filter((comment) => comment.blogId === selectedBlog._id)
                .map((comment, index) => (
                  <CommentCard key={index} comment={comment} />
                ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Detail;

