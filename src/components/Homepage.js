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
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [catInfo, setCatInfo] = useState([]);
  const [filteredCatInfo, setFilteredCatInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState({ min: 0, max: 100 });
  const [colorFilter, setColorFilter] = useState("");
  const [breedFilter, setBreedFilter] = useState("");

  const [allCatInfoFetched, setAllCatInfoFetched] = useState(false);

  const [searchClicked, setSearchClicked] = useState(true);

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    setUserRole(localStorage.getItem("role"));
  }, []);

  const fetchCatData = (queryParams = {}) => {
    const queryString = Object.keys(queryParams).length
      ? "?" +
        Object.entries(queryParams)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";

    console.log(queryString);

    fetch(`/cats${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        if (!queryString) {
          setCatInfo(data.response);
          setAllCatInfoFetched(true);
        }
        setFilteredCatInfo(data.response);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchCatData(); // Fetch all cat data initially
  }, []);

  useEffect(() => {
    if (!searchClicked) {
      return; // Don't fetch if the search button wasn't clicked
    }

    const queryParams = {};

    if (searchTerm) {
      queryParams.name = searchTerm;
    }
    if (genderFilter) {
      queryParams.gender = genderFilter;
    }
    if (colorFilter) {
      queryParams.color = colorFilter;
    }
    if (breedFilter) {
      queryParams.breed = breedFilter;
    }
    if (ageFilter.min || ageFilter.max) {
      queryParams.minAge = parseInt(ageFilter.min) || 0;
      queryParams.maxAge = parseInt(ageFilter.max) || 100;
    }

    fetchCatData(queryParams);

    console.log(queryParams);

    // Reset the searchClicked to false after fetching
    setSearchClicked(false);
  }, [
    searchTerm,
    genderFilter,
    ageFilter,
    colorFilter,
    breedFilter,
    searchClicked,
  ]);

  const handleSearch = () => {
    setSearchClicked(true); // Set searchClicked state to true to trigger fetching
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
            color: "#000000", 
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            color: "#000000", 
            "&.Mui-focused": {
              color: "#000000", 
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
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Let's check out the cat
            </Typography>

            <Grid container spacing={3} mt={4}>
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
              <Grid container spacing={3} mt={4}>
                <Grid item xs={18}>
                  <TextField
                    label="Search by Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    style={{ margin: "10px 0" }}
                  />
                </Grid>

                {/* Filters */}
                <Grid item xs={18}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Filters</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2}>
                        {/* Gender filter */}
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControl fullWidth>
                            <InputLabel id="gender-filter-label">
                              Gender
                            </InputLabel>
                            <Select
                              labelId="gender-filter-label"
                              value={genderFilter}
                              onChange={(e) => setGenderFilter(e.target.value)}
                              label="Gender"
                            >
                              <MenuItem value="">Any</MenuItem>
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
                                  label="Min Age"
                                  type="number"
                                  inputProps={{
                                    min: 0,
                                    max: 30,
                                  }}
                                  value={ageFilter.min}
                                  onChange={(e) =>
                                    setAgeFilter({
                                      ...ageFilter,
                                      min: e.target.value,
                                    })
                                  }
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>

                              <Grid item xs={6}>
                                <TextField
                                  label="Max Age"
                                  type="number"
                                  inputProps={{
                                    min: 0,
                                    max: 30,
                                  }}
                                  value={ageFilter.max}
                                  onChange={(e) =>
                                    setAgeFilter({
                                      ...ageFilter,
                                      max: e.target.value,
                                    })
                                  }
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>
                            </Grid>
                          </FormControl>
                        </Grid>
                        {/* Color filter */}
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            label="Search by Color"
                            variant="outlined"
                            value={colorFilter}
                            onChange={(e) =>
                              setColorFilter(e.target.value.toLowerCase())
                            }
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            label="Search by Breed"
                            variant="outlined"
                            value={breedFilter}
                            onChange={(e) =>
                              setBreedFilter(e.target.value.toLowerCase())
                            }
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    style={{ margin: "10px 0" }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>

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
            {allCatInfoFetched &&
            filteredCatInfo &&
            filteredCatInfo.length > 0 ? (
              filteredCatInfo.map((card) => (
                <Grid item key={card.catID} xs={12} sm={8} md={4}>
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
