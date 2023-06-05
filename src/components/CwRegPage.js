import { useState } from 'react';
import { Grid, TextField, Button, ThemeProvider, Paper, Typography } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { useNavigate, Link } from 'react-router-dom';

import Header from "./Header";
import Footer from "./Footer";

function CwRegPage() {
  const [cwEmail, setCwEmail] = useState('');
  const [cwPassword1, setCwPassword1] = useState('');
  const [cwPassword2, setCwPassword2] = useState('');
  const [cwName, setCwName] = useState('');
  const [signupCode, setSignupCode] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  

  const handleRegister = async (e) => {
    e.preventDefault();

  // Check that all fields are filled out
    if (!cwName || !cwEmail || !cwPassword1 || !signupCode || !cwPassword2 && cwPassword2 !== cwPassword1) {
        setError('All fields must be filled out');
        return;  // Stop here and don't send the form data to the server
    } else if(cwPassword2 !== cwPassword1) {
        setError('Password not match');
        return; 
    }

    const response = await fetch('v1/cwRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cwName,
          cwEmail,
          cwPassword: cwPassword2,
          signUpCode: signupCode,
        }),
      });
    
      const responseData = await response.json();

    if (response.ok) {
        // The registration was successful
        alert('Registration successful! You can now log in.');
        navigate('/cwLogin');
      } else if (responseData.error === 'Invalid sign up code') {
        // The signup code was invalid
        setError('Invalid sign up code');
        return;
      } else {
        // Some other error occurred
        setError('An error occurred while registering. Please try again.');
        return;
      }

    setError('');
    
  };

  const theme = createTheme({

    });

  return (
    <ThemeProvider theme={theme}>
    <Header />
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
    <Grid item xs={10} sm={6} md={4}>
    <Paper elevation={3} style={{ padding: '2rem' }}>
    <Typography variant="h5" gutterBottom>
      Sign Up (Charity Worker)
    </Typography>
    <form onSubmit={handleRegister}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={cwName}
            onChange={(e) => setCwName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
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
            value={cwPassword1}
            onChange={(e) => setCwPassword1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Re-type Password"
            type="password"
            variant="outlined"
            fullWidth
            value={cwPassword2}
            onChange={(e) => setCwPassword2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Sign-up Code"
            type="password"
            variant="outlined"
            fullWidth
            value={signupCode}
            onChange={(e) => setSignupCode(e.target.value)}
          />
        </Grid>
        {error && <p>{error}</p>}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
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

export default CwRegPage;
