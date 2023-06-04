import React from 'react';
import { ThemeProvider, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { createTheme } from "@mui/material/styles";

import Header from "./Header";
import Footer from "./Footer";

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

function LoginPage() {

  return (
    <>
    <ThemeProvider theme={theme}>
    <Header />
    <Grid container justifyContent="center" spacing={2}>
        <Typography variant="body1" color="text.primary" paragraph>
        Choose a role:
        </Typography>
      <Grid item>
        <Button variant="contained" color="primary" component={Link} to="/cwLogin">
          Charity Worker
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" component={Link} to="/pubLogin">
          Public
        </Button>
      </Grid>
    </Grid>
    <Footer />
    </ThemeProvider>
    </>
  );
};

export default LoginPage;