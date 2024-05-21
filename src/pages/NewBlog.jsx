import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { modalStyle } from "../styles/globalStyles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//import { useSelector } from "react-redux";
import useAuthCalls from "../hooks/useAuthCalls";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function NewBlog() {

  const { categories, status } = useSelector((state) => state.blog);
  const initialState = { title: "", image: "", categoryId: "", isPublished: false, content:""};

  const [info, setInfo] = useState(initialState);

  const {postBlog} = useAuthCalls()

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postBlog("blogs", info);
    //handleClose();
  };

  return (
    <div>
      <Box sx={modalStyle}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <TextField
            label="title"
            name="title"
            id="title"
            type="text"
            variant="outlined"
            value={info.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="image"
            name="image"
            id="image"
            type="text"
            variant="outlined"
            value={info.image}
            onChange={handleChange}
            required
          />

          <FormControl fullWidth>
            <InputLabel id="categoryId">Category</InputLabel>
            <Select
              labelId="categoryId"
              id="categoryId"
              name="categoryId"
              label="Categories"
              value={info.categoryId}
              onChange={handleChange}
              required
            >
              {categories.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="isPublished">Status</InputLabel>
            <Select
              labelId="isPublished"
              id="isPublished"
              name="isPublished"
              label="isPublished"
              value={info.isPublished}
              onChange={handleChange}
              required
            >
              {status.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="content"
            name="content"
            id="content"
            type="text"
            variant="outlined"
            value={info.content}
            onChange={handleChange}
            required
          />

          <Button variant="contained" type="submit">
            NEW BLOG
          </Button>
        </Box>
      </Box>
    </div>
  );
}
