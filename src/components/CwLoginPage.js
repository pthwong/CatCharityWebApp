import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

function CwLoginPage() {

    const [cwEmail, setCwEmail] = useState('');
    const [cwPassword, setCwPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(''); // Add this line


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(cwEmail, cwPassword);
        if(cwPassword === '' || cwEmail === '') {
          setError("Blank Email or password");
          
        } else {
          const response = await fetch('v1/cwLogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cwEmail,
              cwPassword,
            }),
          });
  
          const data = await response.json();
  
  
          if (response.ok) {
            // Save the token in localStorage to keep the user logged in
            localStorage.setItem('token', data.token);
            // Optionally, save the user's email in the state or in localStorage
            localStorage.setItem('userEmail', cwEmail);
            localStorage.setItem('role', 'cw');
            // Redirect user to home page or dashboard
            navigate('/');
          } else {
            // Handle login error
            setError("Incorrect Email or password, try again.");
          }
        }

      }

      
    return(
        <ThemeProvider theme={theme}>
        <Header />
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={10} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Login (Charity Worker)
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={cwEmail}
                    onChange={(e) => setCwEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={cwPassword}
                    onChange={(e) => setCwPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                {error && <p>{error}</p>}
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" fullWidth component={Link} to="/cwSignup">
                    Sign up
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

export default CwLoginPage;