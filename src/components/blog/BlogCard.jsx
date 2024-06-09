import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Badge,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useBlogCalls from "../../hooks/useBlogCalls";
export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  const { getVisitBlog, postLike, getBlog } = useBlogCalls();
  const handleReadMore = () => {
    getVisitBlog("blogs", blog._id);
    user ? navigate(`/detail/${blog._id}`) : navigate("/login");
  };
  const handleLike = async () => {
    if (user) {
      await postLike(blog._id);
      await getBlog("blogs");
    } else {
      navigate("/login");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "300px",
        height: "400px",
        p: 2,
      }}
    >
      <CardMedia
        component="img"
        alt={blog?.title}
        height="140"
        image={blog?.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {blog?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {blog?.content}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Published Date:{" "}
          {new Date(blog?.createdAt).toLocaleDateString("tr-TR")}
        </Typography>

        <Stack
          mt={3}
          direction="row"
          gap={3}
          justifyContent="center"
          alignItems="center"
          color="text.secondary"
        >
          <Badge badgeContent={blog?.likes.length} color="primary">
            <FavoriteBorderIcon
              onClick={handleLike}
              sx={{
                cursor: "pointer",
              }}
            />
          </Badge>
          <Stack direction="row" alignItems="center">
            <Badge badgeContent={blog?.comments.length} color="primary">
              <ChatBubbleOutlineIcon />
            </Badge>
          </Stack>
          <Badge badgeContent={blog?.countOfVisitors} color="primary">
            <VisibilityIcon />
          </Badge>
          <Button variant="outlined" onClick={handleReadMore}>
            Read More
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
