import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, ThemeProvider } from '@mui/material';
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

function PubLoginPage() {

    const [pubEmail, setPubEmail] = useState('');
    const [pubPassword, setPubPassword] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();
        // Perform login logic here
      };



    return(
      <ThemeProvider theme={theme}>
      <Header />
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={10} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Login (Public)
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={pubEmail}
                    onChange={(e) => setPubEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={pubPassword}
                    onChange={(e) => setPubPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" fullWidth>
                    Register
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
    );

}

export default PubLoginPage;