import { async } from "q";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import Header from "./Header";
import Footer from "./Footer";

function CatDetails() {
  const { catID } = useParams();

  const [catDetails, setCatDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCatData = async () => {
      setIsLoading(true);
      const response = await fetch(`/v1/cat/${catID}`);
      const data = await response.json();
      console.log(data.response);
      setCatDetails(data.response[0]);
      setIsLoading(false);
    };
    fetchCatData();
  }, [catID]);

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
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              {catDetails.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Breed: {catDetails.breed}
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Age: {catDetails.age} years old
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Description: {catDetails.description}
            </Typography>
            {/* Add more cat details here */}
          </Box>
        </Container>
      )}
      <Footer />
    </ThemeProvider>
  );
}

export default CatDetails;
