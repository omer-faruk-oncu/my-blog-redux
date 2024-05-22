import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardMedia, Typography, Stack, Button, TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { btnStyle } from "../styles/globalStyles";
import useBlogCalls from "../hooks/useBlogCalls";
import CommentCard from "../components/blog/CommentCard";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog.blogs.find((blog) => blog._id === id));
  const comments = useSelector((state) => state.blog.comments[id] || []);
  const [commentText, setCommentText] = React.useState("");
  const [showTextField, setShowTextField] = React.useState(false);
  const { getBlog, getBlogComments, addComment } = useBlogCalls();

  React.useEffect(() => {
    if (!blog) {
      getBlog();
    }
    if (id) {
      getBlogComments(id);
    }
  }, [blog, getBlog, getBlogComments, id]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(id, commentText);
      setCommentText("");
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 5,
        p: 2,
      }}
    >
      <CardMedia component="img" alt={blog?.title} height="300" image={blog?.image} />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {blog?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog?.content}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Published Date: {new Date(blog?.createdAt).toLocaleDateString("tr-TR")}
        </Typography>
        <Stack
          mt={3}
          direction="row"
          gap={3}
          justifyContent="center"
          alignItems="center"
          color="text.secondary"
        >
          <FavoriteBorderIcon sx={btnStyle} />
          <ChatBubbleOutlineIcon sx={btnStyle} onClick={() => setShowTextField(!showTextField)} />
          <VisibilityIcon sx={btnStyle} />
        </Stack>
        {showTextField && (
          <Stack mt={3} spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddComment}>
              Add Comment
            </Button>
          </Stack>
        )}
        <Stack mt={3} spacing={2}>
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </Stack>
      </CardContent>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => window.history.back()}>
        Go Back
      </Button>
    </Card>
  );
};

export default Detail;
