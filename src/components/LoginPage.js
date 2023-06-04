import React from 'react';
import { ThemeProvider, Button, Grid } from '@mui/material';

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
  const handleRoleSelection = (role) => {
    // Add your code here to handle the role selection.
    console.log(`User chose role: ${role}`);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
    <Header />
    <Grid container justifyContent="center" spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={() => handleRoleSelection('Charity Worker')}>
          Charity Worker
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={() => handleRoleSelection('Public')}>
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