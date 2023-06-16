import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Container,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function CreateCatForm() {
  const [catName, setCatName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [color, setColor] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [catImage, setCatImage] = useState(null);
  const [catImgPreview, setCatImgPreview] = useState(null);

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#000000",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#000000",
            },
          },
          input: {
            color: "#000000", // input text color
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            color: "#000000", // label color
            "&.Mui-focused": {
              color: "#000000", // label color when input is focused
            },
          },
        },
      },
    },
  });

  const handleCreateCat = async (e) => {
    e.preventDefault();

    if (!catName || !gender || !age || !color || !breed || !description) {
      setError("Please fill in the cat details");
      return;
    }

    // Create a FormData instance
    const formData = new FormData();

    // Append the form data
    formData.append("name", catName);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("color", color);
    formData.append("breed", breed);
    formData.append("description", description);
    formData.append("catImage", catImage); // This is the file we want to upload
    formData.append("cwEmail", userEmail);

    // Send a POST request to the backend
    const response = await fetch("/v1/createCatDetails", {
      method: "POST",
      body: formData, // send the formData
    });

    if (response.ok) {
      alert("Cat details created successfully!");
      navigate("/");
    } else {
      setError("Failed to create cat details, please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setCatImgPreview(null);
      return;
    }
    setCatImage(file);

    // Generate a URL for the image file to be used in an <img> element
    const url = URL.createObjectURL(file);
    setCatImgPreview(url);
  };

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    setUserRole(localStorage.getItem("role"));
  }, [userEmail, userRole]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {userRole === "cw" ? (
          <>
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Add the details of the cat here
            </Typography>
            <form onSubmit={handleCreateCat} encType="multipart/form-data">
              <Grid container spacing={4}>
                {/* Left Column for Image */}
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "500px",
                      border: "1px dashed gray",
                      backgroundColor: "#f0f0f0",
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.items) {
                        const file = e.dataTransfer.items[0].getAsFile();
                        handleImageChange({ target: { files: [file] } });
                      }
                    }}
                  >
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    {catImgPreview ? (
                      <label htmlFor="contained-button-file">
                        <img
                          src={catImgPreview}
                          alt="Preview"
                          style={{
                            maxWidth: "50%",
                            maxHeight: "50%",
                            objectFit: "contain",
                          }}
                        />
                      </label>
                    ) : (
                      <label htmlFor="contained-button-file">
                        <Typography variant="body1">
                          Drag / Click to upload Cat Image Here...
                        </Typography>
                      </label>
                    )}
                  </Box>
                  {/* 
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" style={{ marginTop: '16px' }}>
                  Upload Cat Image
                </Button>
              </label> */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid item xs={12}>
                    <TextField
                      label="Cat Name"
                      variant="outlined"
                      fullWidth
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      placeholder="Enter the name of the cat here..."
                      sx={{ margin: "12px" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      variant="outlined"
                      fullWidth
                      sx={{ margin: "12px" }}
                    >
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select
                        labelId="gender-label"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        label="Gender"
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Age"
                      variant="outlined"
                      type="number"
                      fullWidth
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      inputProps={{
                        min: 0,
                        max: 30,
                      }}
                      placeholder="Enter age of the cat here..."
                      sx={{ margin: "12px" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Color"
                      variant="outlined"
                      placeholder="Enter color of the cat here..."
                      fullWidth
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      sx={{ margin: "12px" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Breed"
                      variant="outlined"
                      placeholder="Enter breed of the cat here..."
                      fullWidth
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      sx={{ margin: "12px" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      placeholder="Enter description of the cat here..."
                      variant="outlined"
                      fullWidth
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      multiline
                      rows={4}
                      sx={{ margin: "12px" }}
                    />
                  </Grid>
                  {error && <p>{error}</p>}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add Cat
                  </Button>
                </Grid>
              </Grid>
            </form>
          </>
        ) : (
          <>
            <Typography
              component="h3"
              variant="h3"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Sorry, you did not have permission to create the cat details!
            </Typography>
          </>
        )}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default CreateCatForm;
