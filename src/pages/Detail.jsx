import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Stack, TextField } from "@mui/material";
import UpdateModal from "../components/blog/UpdateModal";
import CommentCard from "../components/blog/CommentCard";
import useBlogCalls from "../hooks/useBlogCalls";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toastErrorNotify } from "../helper/ToastNotify";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBlog, deleteBlog } = useBlogCalls();
  const { blogs, categories } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getBlog("categories")
    const blog = blogs.find((blog) => blog._id === id);
    setSelectedBlog(blog);
  }, []);

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    deleteBlog("blogs", selectedBlog._id);
    navigate("/myblog");
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pb: 8,
      }}
    >
      <Box sx={{ flexGrow: 1, p: 2 }}>
        {selectedBlog && (
          <>
            <Typography variant="h4" color="primary.main" gutterBottom>
              {selectedBlog.title}
            </Typography>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              width="100%"
            />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {selectedBlog.content}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Published Date:
              {new Date(selectedBlog.createdAt).toLocaleDateString("tr-TR")}
            </Typography>

            {user?._id === selectedBlog.userId && (
              <Stack
                direction="row"
                gap={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2 }}
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

            <Stack
              mt={3}
              direction="row"
              gap={3}
              justifyContent="center"
              alignItems="center"
              color="text.secondary"
            >
              <FavoriteBorderIcon />
              <Stack direction="row" alignItems="center">
                <ChatBubbleOutlineIcon />
              </Stack>
              <VisibilityIcon />
            </Stack>

            {/* <Box mt={3}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Add a comment"
                //onChange={(e) => setCommentText(e.target.value)}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Comment
              </Button>
            </Box> */}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Detail;
// const Detail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { getBlog, deleteBlog, getBlogComments, addComment } = useBlogCalls();
//   const { blogs, categories, comments } = useSelector((state) => state.blog);
//   const { user } = useSelector((state) => state.auth);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [showCommentForm, setShowCommentForm] = useState(false);
//   const [localComments, setLocalComments] = useState([]); // Local state to store comments

//   useEffect(() => {
//     if (blogs.length === 0) {
//       getBlog();
//     } else {
//       const blog = blogs.find((blog) => blog._id === id);
//       setSelectedBlog(blog);
//     }
//     if (selectedBlog) {
//       getBlogComments(selectedBlog._id);
//     }
//   }, [blogs, id, getBlog, getBlogComments, selectedBlog]);

//   useEffect(() => {
//     if (selectedBlog && comments[selectedBlog._id]) {
//       setLocalComments(comments[selectedBlog._id]);
//     }
//   }, [comments, selectedBlog]);

//   const handleUpdate = () => {
//     setOpen(true);
//   };

//   const handleDelete = () => {
//     deleteBlog("blogs", selectedBlog._id);
//     navigate("/myblog");
//   };

//   const handleComment = () => {
//     setShowCommentForm(!showCommentForm);
//   };

//   const handleAddComment = async () => {
//     if (commentText.trim()) {
//       await addComment(selectedBlog._id, commentText);
//       setLocalComments((prevComments) => [
//         ...prevComments,
//         { text: commentText, username: user.username, createdAt: new Date().toISOString() },
//       ]);
//       setCommentText("");
//     } else {
//       toastErrorNotify("Comment cannot be empty.");
//     }
//   };

//   return (
//     <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pb: 8 }}>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         {selectedBlog && (
//           <>
//             <Typography variant="h4" color="primary.main" gutterBottom>
//               {selectedBlog.title}
//             </Typography>
//             <img src={selectedBlog.image} alt={selectedBlog.title} width="100%" />
//             <Typography variant="body1" sx={{ mt: 2 }}>
//               {selectedBlog.content}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               Published Date: {new Date(selectedBlog.createdAt).toLocaleDateString("tr-TR")}
//             </Typography>

//             {user?._id === selectedBlog.userId && (
//               <Stack direction="row" gap={2} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
//                 <Button variant="contained" color="primary" onClick={handleUpdate}>
//                   Update Blog
//                 </Button>
//                 <Button variant="contained" color="secondary" onClick={handleDelete}>
//                   Delete Blog
//                 </Button>
//               </Stack>
//             )}
//             <UpdateModal open={open} handleClose={() => setOpen(false)} blog={selectedBlog} categories={categories} />

//             <Stack
//               mt={3}
//               direction="row"
//               gap={3}
//               justifyContent="center"
//               alignItems="center"
//               color="text.secondary"
//             >
//               <FavoriteBorderIcon />
//               <Stack direction="row" alignItems="center" onClick={handleComment}>
//                 <ChatBubbleOutlineIcon />
//               </Stack>
//               <VisibilityIcon />
//             </Stack>

//             {showCommentForm && (
//               <Box mt={3}>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   label="Add a comment"
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{ mt: 2 }}
//                   onClick={handleAddComment}
//                 >
//                   Add Comment
//                 </Button>
//               </Box>
//             )}

//             <Box mt={3}>
//               {localComments.map((comment, index) => (
//                 <CommentCard key={index} comment={comment} />
//               ))}
//             </Box>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Detail;
