import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { modalStyle } from "../../styles/globalStyles";
import useBlogCalls from "../../hooks/useBlogCalls";

const UpdateModal = ({ open, handleClose, blog, categories }) => {
  const [info, setInfo] = useState(blog);
  const { putBlog } = useBlogCalls();
  console.log(info)

  useEffect(() => {
    setInfo(blog);
  }, [blog]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putBlog("blogs", info);
    handleClose();
  };

  return (
    <div>
      {open && (
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <Typography variant="h5" color="primary.main">
              Update Blog
            </Typography>

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
              UPDATE BLOG
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default UpdateModal;
