import { async } from "q";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
  ThemeProvider,
  Container,
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";

function CatDetails() {
  const navigate = useNavigate();
  const { catID } = useParams();

  const [catDetails, setCatDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [hasUserLiked, setHasUserLiked] = useState(false);

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    setUserRole(localStorage.getItem("role"));
  }, [userEmail, userRole]);

  useEffect(() => {
    const fetchCatData = async () => {
      setIsLoading(true);
      const response = await fetch(`/cat/${catID}`);
      const data = await response.json();
      console.log(data[0]);
      setCatDetails(data[0]);
      console.log(data[0].catImgPath);
      setIsLoading(false);
    };
    fetchCatData();
  }, [catID]);

  useEffect(() => {
    handleGetFavourites();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const offsetHours = 0;
    const offsetInMilliseconds = offsetHours * 60 * 60 * 1000;
    const localDate = new Date(date.getTime() + offsetInMilliseconds);

    const day = localDate.getDate().toString().padStart(2, "0");
    const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
    const year = localDate.getFullYear().toString().substr(-2);

    const hours = localDate.getHours().toString().padStart(2, "0");
    const minutes = localDate.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleDelCat = async (catID) => {
    const confirmation = window.confirm(
      "Are you sure to delete the details of the cat?"
    );

    const token = localStorage.getItem("token");

    if (confirmation) {
      try {
        const response = await fetch(`/cat/${catID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Cat successfully deleted:", data);

        alert("The details of the cat are successfully deleted");
        navigate("/");
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        alert("Error occured");
      }
    }
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
  });

  const handleGetFavourites = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    try {
      const response = await axios.post(
        "/favourite",
        {
          pubEmail: email,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // Check if the user has liked the current cat
      const catResponse = response.data;
      const isLiked = catResponse.some((cat) => cat.catID === catDetails.catID);
      console.log(isLiked);
      setHasUserLiked(isLiked);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleSaveToFavourites = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/addFavourite",
        {
          pubEmail: userEmail, // Replace with the user's email address
          catID: catID, // Replace with the cat's ID
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // Show a success message
      if (response.ok) {
        alert("Added the cat to favourite list.");
        window.location.reload();
      }
    } catch (error) {
      // Handle error
      alert("Error occured.");
      console.error(error);
    }
  };

  const handleRemoveFavourites = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        "/favourite",
        {
          pubEmail: userEmail, // Replace with the user's email address
          catID: catID, // Replace with the cat's ID
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      // Show a success message
      if (response.ok) {
        alert("Removed the cat to favourite list.");
        window.location.reload();
      }
    } catch (error) {
      // Handle error
      alert("Error occured.");
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="md" sx={{ mt: 12, mb: 12 }}>
          {!catDetails ? (
            <>
              <Typography variant="h2" component="h1" gutterBottom>
                Cannot find the cat
              </Typography>
            </>
          ) : (
            <>
              <Grid container spacing={16}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    sx={{
                      height: "100%",
                      width: "100%",
                      maxWidth: "100%",
                      borderRadius: "5px",
                      objectFit: "cover",
                    }}
                    alt={catDetails.name}
                    src={`/catImage/${catDetails.catImgPath}`}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ my: 4 }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                      {catDetails.name}
                    </Typography>
                    <Typography variant="body1" color="text.primary" paragraph>
                      Gender: {catDetails.gender}
                    </Typography>
                    <Typography variant="body1" color="text.primary" paragraph>
                      Breed: {catDetails.breed}
                    </Typography>
                    <Typography variant="body1" color="text.primary" paragraph>
                      Color: {catDetails.color}
                    </Typography>
                    <Typography variant="body1" color="text.primary" paragraph>
                      Age: {catDetails.age} years old
                    </Typography>
                    <Typography variant="body1" color="text.primary" paragraph>
                      Description: {catDetails.description}
                    </Typography>
                    <Typography variant="body1" color="text.primary" paragraph>
                      Updated Time: {formatDate(catDetails.updateDateTime)}
                    </Typography>

                    {userRole === "pub" ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2 }}
                          onClick={
                            hasUserLiked
                              ? handleRemoveFavourites
                              : handleSaveToFavourites
                          }
                        >
                          {hasUserLiked
                            ? `Remove ${catDetails.name} from favourite list`
                            : `Save ${catDetails.name} to favourite list`}
                        </Button>
                      </>
                    ) : null}

                    {userRole === "cw" ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2 }}
                          component={Link}
                          to={`/updateCatDetails/${catID}`}
                        >
                          Update cat details
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2 }}
                          onClick={() => handleDelCat(catID)}
                        >
                          Remove the details of the cat
                        </Button>
                      </>
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      )}
      <Footer />
    </ThemeProvider>
  );
}

export default CatDetails;
