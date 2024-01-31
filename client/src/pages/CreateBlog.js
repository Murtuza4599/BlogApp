import React, { useState } from "react";
import axios from "axios";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created Successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"60%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin={"auto"}
          boxShadow={"10px 10px 20px #ccc"}
          display={"flex"}
          flexDirection={"column"}
          marginTop={3}
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight={"bold"}
            padding={3}
            color="gray"
          >
            Create A Post
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px" }}>Title</InputLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px" }}>
            Description
          </InputLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px" }}>
            Image URL
          </InputLabel>
          <TextField
            value={inputs.image}
            onChange={handleChange}
            name="image"
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
