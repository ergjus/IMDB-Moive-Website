import React, {useState} from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
    category: "question",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.name;
    const categoryMessage =
      formData.category === "other" ? "inquiry" : formData.category;
    alert(`Sleep tight ${name}, we recieved your ${categoryMessage}.`);
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{p: 2}}>
      <div className="w-full">
        <h1 className="text-xl font-bold">Contact Us</h1>
        <p className="text-slate-400 pt-2">
          Whether you have feedback or a question, fill out the form and we will
          reach out within 2 business days.
        </p>
      </div>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fbecb2",
              },
              "&:hover fieldset": {
                borderColor: "#fbecb2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fbecb2",
              },
              "& input": {
                color: "#fbecb2",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fbecb2",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fbecb2",
            },
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fbecb2",
              },
              "&:hover fieldset": {
                borderColor: "#fbecb2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fbecb2",
              },
              "& input": {
                color: "#fbecb2",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fbecb2",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fbecb2",
            },
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Details"
          name="details"
          multiline
          rows={4}
          value={formData.details}
          onChange={handleChange}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#fbecb2",
              },
              "&:hover fieldset": {
                borderColor: "#fbecb2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fbecb2",
              },
              "& textarea": {
                color: "#fbecb2",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fbecb2",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fbecb2",
            },
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel
          id="category-label"
          sx={{
            color: "#fbecb2",
            "&.Mui-focused": {
              color: "#fbecb2", // Ensures the label stays gold when focused
            },
          }}>
          Category
        </InputLabel>
        <Select
          labelId="category-label"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fbecb2", // Border color of the select field
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fbecb2", // Border color on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fbecb2", // Border color when focused
            },
            "& .MuiSelect-select": {
              color: "#fbecb2", // Text color inside the select
              backgroundColor: "#272829", // Change select field background
            },
            "& .MuiSelect-icon": {
              color: "#fbecb2", // Dropdown arrow color
            },
            "& .MuiPaper-root": {
              backgroundColor: "#272829", // Background color of the dropdown menu
            },
            "& .MuiList-root": {
              backgroundColor: "#272829", // Background color of the dropdown menu
            },
            "& .MuiMenuItem-root": {
              color: "#fbecb2", // Text color of menu items
            },
          }}>
          <MenuItem value="question">Question</MenuItem>
          <MenuItem value="feedback">Feedback</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      <Button
        className="formButton"
        type="submit"
        variant="contained"
        sx={{mt: 2, backgroundColor: "#fbecb2", color: "#151515"}}>
        Submit
      </Button>
    </Box>
  );
};

export default Footer;
