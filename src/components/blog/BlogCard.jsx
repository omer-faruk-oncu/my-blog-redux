import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { btnStyle } from "../../styles/globalStyles";
import { Button, Stack } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CastIcon from '@mui/icons-material/Cast';
import VisibilityIcon from '@mui/icons-material/Visibility';
//import useStockRequest from "../services/useStockRequest";

export default function BlogCard({ blog, handleOpen }) {
  //   const btnStyle = {
  //     "&:hover": { color: "red", cursor: "pointer" },
  //   }
  //const { address, _id, name, phone, image } = firm
  //const { deleteStock } = useStockRequest()
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
        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
        >
          Published Date : 
          {new Date(blog?.createdAt).toLocaleDateString("tr-TR")}
        </Typography>
        
        <Stack mt={3} display="flex" flexDirection="row" gap="30px" textAlign="center">

          <FavoriteBorderIcon sx={btnStyle} />
          <CastIcon sx={btnStyle} />
          <VisibilityIcon sx={btnStyle} />
          <Button sx={{border:"1px solid"}}>
            Read More
          </Button>

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
