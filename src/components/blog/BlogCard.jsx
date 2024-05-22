import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { btnStyle } from "../../styles/globalStyles";
import { Button, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router";

export default function BlogCard({ blog }) {

  const navigate = useNavigate();
  const handleReadMore = () => {
    navigate(`/detail/${blog._id}`);
  };

  //const { getBlog} = useBlogCalls();

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
          Published Date :
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
          <FavoriteBorderIcon sx={btnStyle} />
          <Stack direction="row" alignItems="center">
            <ChatBubbleOutlineIcon
              sx={btnStyle}
            />
        
          </Stack>
          <VisibilityIcon sx={btnStyle} />
          <Button sx={{ border: "1px solid" }} onClick={handleReadMore}>Read More</Button>
        </Stack>
      </CardContent>
      {/* <CardActions>
        <DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteStock("firms", firm?._id)}
        />
        <EditIcon
          sx={btnStyle}
          onClick={() => {handleOpen()}}
        />
      </CardActions> */}
    </Card>
  );
}
