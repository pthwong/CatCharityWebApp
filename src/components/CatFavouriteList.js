import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Container,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";

function CatFavouriteList() {
  const [favouriteCats, setFavouriteCats] = useState([]);

  //Search & Filter
  //   const [searchTerm, setSearchTerm] = useState("");
  //   const [genderFilter, setGenderFilter] = useState("");
  //   const [ageFilter, setAgeFilter] = useState({ min: 0, max: 100 });
  //   const [colorFilter, setColorFilter] = useState("");
  //   const [breedFilter, setBreedFilter] = useState("");
  //   const [filteredCatInfo, setFilteredCatInfo] = useState([]);

  //   const [selectedColors, setSelectedColors] = useState([]);
  //   const [selectedBreeds, setSelectedBreeds] = useState([]);

  useEffect(() => {
    const fetchFavouriteCats = async () => {
      const email = localStorage.getItem("userEmail");
      try {
        const response = await fetch("/v1/favourite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pubEmail: email }),
        });
        const data = await response.json();
        console.log(data.response);
        setFavouriteCats(data.response);
      } catch (error) {
        console.error("Failed to fetch favorite cats", error);
      }
    };

    fetchFavouriteCats();
  }, []);

  //   useEffect(() => {
  //     const filterResults = catInfo.filter((cat) => {
  //       const nameMatches = cat.name
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase());
  //       const genderMatches = !genderFilter || cat.gender === genderFilter;
  //       const ageMatches = cat.age >= ageFilter.min && cat.age <= ageFilter.max;
  //       const colorMatches =
  //         !colorFilter || cat.color.toLowerCase().includes(colorFilter);
  //       const breedMatches =
  //         !breedFilter || cat.breed.toLowerCase().includes(breedFilter);
  //       return (
  //         nameMatches &&
  //         genderMatches &&
  //         ageMatches &&
  //         colorMatches &&
  //         breedMatches
  //       );
  //     });
  //     setFilteredCatInfo(filterResults);
  //   }, [searchTerm, genderFilter, ageFilter, colorFilter, breedFilter, catInfo]);

  //   const colors = Array.from(new Set(catInfo.map((cat) => cat.color)));
  //   const breeds = Array.from(new Set(catInfo.map((cat) => cat.breed)));

  //   const handleColorChange = (event) => {
  //     const color = event.target.value;
  //     setSelectedColors((prevState) =>
  //       prevState.includes(color)
  //         ? prevState.filter((c) => c !== color)
  //         : [...prevState, color]
  //     );
  //   };

  //   const handleBreedChange = (event) => {
  //     const breed = event.target.value;
  //     setSelectedBreeds((prevState) =>
  //       prevState.includes(breed)
  //         ? prevState.filter((b) => b !== breed)
  //         : [...prevState, breed]
  //     );
  //   };

  //   const handleSearchChange = (e) => {
  //     setSearchTerm(e.target.value);
  //   };

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
          <Container maxWidth="lg">
            <Typography
              align="center"
              variant="h2"
              color="textSecondary"
              style={{ width: "100%" }}
            >
              My favourite cats
            </Typography>
            <Grid container spacing={4} style={{ width: "100%" }} mt={10}>
              {favouriteCats.length > 0 ? (
                <List style={{ width: "100%" }}>
                  {favouriteCats.map((cat) => (
                    <Link
                      to={{
                        pathname: `/${cat.catID}`,
                        state: { catID: cat.catID },
                      }}
                      style={{ textDecoration: "none", width: "100%" }}
                    >
                      <ListItem
                        key={cat.favID}
                        sx={{
                          borderColor: "grey.500",
                          border: 1,
                          borderRadius: 2,
                          mb: 2,
                          p: 2,
                        }}
                        style={{ width: "100%" }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={`catImage/${cat.catImgPath}`}
                            alt={cat.name}
                            sx={{ width: 80, height: 80, marginRight: 3 }} // Increase the size of the Avatar and add margin to the right
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h4" component="div">
                              {cat.name}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body1" color="textSecondary">
                              Color: {cat.color}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              ) : (
                <Typography
                  align="center"
                  variant="h6"
                  color="textSecondary"
                  style={{ width: "100%" }}
                >
                  No favourite cats
                </Typography>
              )}
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default CatFavouriteList;
