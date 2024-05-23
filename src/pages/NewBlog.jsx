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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";

export default function NewBlog() {
  const { categories } = useSelector((state) => state.blog);
  const initialState = {
    title: "",
    image: "",
    categoryId: "",
    isPublished: false,
    content: "",
  };

  const [info, setInfo] = useState(initialState);
  const { postBlog, getBlog } = useBlogCalls();

  useEffect(() => {
    getBlog("categories"); 
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postBlog("blogs", info);
    setInfo(initialState)
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
              <MenuItem >Please Choose...</MenuItem>
              <MenuItem value={true}>Published</MenuItem>
              <MenuItem value={false}>Draft</MenuItem>

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
