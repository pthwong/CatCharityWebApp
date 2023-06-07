import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";

function Homepage() {
  const [catInfo, setCatInfo] = useState([]);

  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    setUserEmail(localStorage.getItem('userEmail'));
    setUserRole(localStorage.getItem('role'));

  }, [userEmail, userRole]);


  useEffect(() => {
    fetch("/v1/cat")
      .then((response) => response.json())
      .then((response) => setCatInfo(response.response))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Let's check out the cat
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            ></Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {catInfo.map((card) => (
              <Grid item key={card} xs={12} sm={8} md={4}>
                <Link
                  to={{
                    pathname: `/cat/${card.catID}`,
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
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
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
            ))}
          </Grid>
          { userRole === 'cw' ?            
             <>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} component={Link} to="/createCatDetails">
                 Add Cat information
              </Button> 
             </>
            : null
          }
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Homepage;
