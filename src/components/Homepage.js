import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";

function Homepage() {
  const [catInfo, setCatInfo] = useState([]);

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  //Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState({ min: 0, max: 100 });
  const [colorFilter, setColorFilter] = useState("");
  const [breedFilter, setBreedFilter] = useState("");
  const [filteredCatInfo, setFilteredCatInfo] = useState([]);

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    setUserRole(localStorage.getItem("role"));
  }, [userEmail, userRole]);

  useEffect(() => {
    fetch("/v1/cat")
      .then((response) => response.json())
      .then((response) => setCatInfo(response.response))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filterResults = catInfo.filter((cat) => {
      const nameMatches = cat.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const genderMatches = !genderFilter || cat.gender === genderFilter;
      const ageMatches = cat.age >= ageFilter.min && cat.age <= ageFilter.max;
      const colorMatches =
        !colorFilter || cat.color.toLowerCase().includes(colorFilter);
      const breedMatches =
        !breedFilter || cat.breed.toLowerCase().includes(breedFilter);
      return (
        nameMatches &&
        genderMatches &&
        ageMatches &&
        colorMatches &&
        breedMatches
      );
    });
    setFilteredCatInfo(filterResults);
  }, [searchTerm, genderFilter, ageFilter, colorFilter, breedFilter, catInfo]);

  const colors = Array.from(new Set(catInfo.map((cat) => cat.color)));
  const breeds = Array.from(new Set(catInfo.map((cat) => cat.breed)));

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColors((prevState) =>
      prevState.includes(color)
        ? prevState.filter((c) => c !== color)
        : [...prevState, color]
    );
  };

  const handleBreedChange = (event) => {
    const breed = event.target.value;
    setSelectedBreeds((prevState) =>
      prevState.includes(breed)
        ? prevState.filter((b) => b !== breed)
        : [...prevState, breed]
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Header />

      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container sx={{ py: 1 }} maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Let's check out the cat
            </Typography>

            <Grid container spacing={2}>
              {userRole === "cw" ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, mb: 2 }}
                    component={Link}
                    to="/createCatDetails"
                  >
                    Add Cat information
                  </Button>
                </>
              ) : null}

              {/* Search bar */}
              <Grid container spacing={3}>
                <Grid item xs={18}>
                  <TextField
                    label="Search by Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    fullWidth
                    style={{ margin: "10px 0" }}
                  />
                </Grid>

                {/* Filters */}
                <Grid item xs={18}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Filters</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {/* Gender filter */}
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl variant="outlined" fullWidth>
                            <InputLabel>Gender</InputLabel>
                            <Select
                              value={genderFilter}
                              onChange={(e) => setGenderFilter(e.target.value)}
                              label="Gender"
                            >
                              <MenuItem value="">All</MenuItem>
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        {/* Age filter */}
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth>
                            <Typography variant="body1">Age Range:</Typography>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <TextField
                                  type="number"
                                  label="Min Age"
                                  variant="outlined"
                                  value={ageFilter.min}
                                  inputProps={{
                                    min: 0,
                                    max: 30,
                                  }}
                                  onChange={(e) =>
                                    setAgeFilter({
                                      ...ageFilter,
                                      min: e.target.value,
                                    })
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  type="number"
                                  label="Max Age"
                                  variant="outlined"
                                  value={ageFilter.max}
                                  inputProps={{
                                    min: 0,
                                    max: 30,
                                  }}
                                  onChange={(e) =>
                                    setAgeFilter({
                                      ...ageFilter,
                                      max: e.target.value,
                                    })
                                  }
                                />
                              </Grid>
                            </Grid>
                          </FormControl>
                        </Grid>

                        {/* Color filter */}
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              label="Search by Color"
                              variant="outlined"
                              value={colorFilter}
                              onChange={(e) =>
                                setColorFilter(e.target.value.toLowerCase())
                              }
                            />
                          </FormControl>
                        </Grid>

                        {/* Breed filter */}
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth>
                            <TextField
                              label="Search by Breed"
                              variant="outlined"
                              value={breedFilter}
                              onChange={(e) =>
                                setBreedFilter(e.target.value.toLowerCase())
                              }
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Grid>

            {/* <FormControl fullWidth style={{ margin: '10px 0' }}>
                  <Typography variant="body1">Colors:</Typography>
                  <FormGroup>
                    {colors.map(color => (
                      <FormControlLabel
                        control={<Checkbox value={color} onChange={handleColorChange} />}
                        label={color}
                      />
                    ))}
                  </FormGroup>
                </FormControl>

                <FormControl fullWidth style={{ margin: '10px 0' }}>
                  <Typography variant="body1">Breeds:</Typography>
                  <FormGroup>
                    {breeds.map(breed => (
                      <FormControlLabel
                        control={<Checkbox value={breed} onChange={handleBreedChange} />}
                        label={breed}
                      />
                    ))}
                  </FormGroup>
                </FormControl> */}

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
          <Grid container spacing={4}>
            {filteredCatInfo.length > 0 ? (
              filteredCatInfo.map((card) => (
                <Grid item key={card} xs={12} sm={8} md={4}>
                  <Link
                    to={{
                      pathname: `/${card.catID}`,
                      state: { catID: card.catID },
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          height: 0,
                          paddingBottom: "100%",
                        }}
                        image={`/catImage/${card.catImgPath}`}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.name}
                        </Typography>
                        <Typography>{card.gender}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  align="center"
                  style={{ margin: "20px 15px 10px 15px" }}
                >
                  Sorry. No cat found.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Homepage;
