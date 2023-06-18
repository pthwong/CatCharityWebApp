import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";

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

function PubLoginPage() {
  const [pubEmail, setPubEmail] = useState("");
  const [pubPassword, setPubPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Add this line

  let inactivityTimeout;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (pubPassword === "" || pubEmail === "") {
      setError("Blank Email or password");
    } else {
      const response = await fetch("/pubLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pubEmail,
          pubPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token in localStorage to keep the user logged in
        localStorage.setItem("token", data.token);
        // Optionally, save the user's email in the state or in localStorage
        localStorage.setItem("userEmail", pubEmail);
        localStorage.setItem("role", "pub");

        // Set session expiration time (2 hours from the current time)
        const sessionExpiration = new Date().getTime() + 2 * 60 * 60 * 1000;
        localStorage.setItem("sessionExpiration", sessionExpiration);

        // Start a timer to check for user inactivity
        inactivityTimeout = setTimeout(() => {
          // Redirect user to logout or inactive page
          logoutUser();
        }, 2 * 60 * 60 * 1000); // 2 hours

        // Attach an event listener to reset the inactivity timer on user activity
        document.addEventListener("mousemove", resetInactivityTimer);
        document.addEventListener("keydown", resetInactivityTimer);

        // Redirect user to home page
        navigate("/");
      } else if (response.status === 401) {
        // Handle login error
        setError("Incorrect Email or password, try again.");
      } else {
        setError("There are some errors to login, try again.");
      }
    }
  };

  const resetInactivityTimer = () => {
    const sessionExpiration = localStorage.getItem("sessionExpiration");
    if (sessionExpiration) {
      clearTimeout(inactivityTimeout);
      const newExpiration = new Date().getTime() + 2 * 60 * 60 * 1000; // Reset session expiration time
      localStorage.setItem("sessionExpiration", newExpiration);
      inactivityTimeout = setTimeout(() => {
        // Redirect user to logout or inactive page
        logoutUser();
      }, 2 * 60 * 60 * 1000); // 2 hours
    }
  };

  // Function to logout the account
  const logoutUser = () => {
    // Clear the localStorage items and reload the page
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");
    localStorage.removeItem("sessionExpiration");
    alert("You are idled over two hours and the account will be logout.");
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={10} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: "2rem" }}>
            <Typography variant="h5" gutterBottom>
              Login (Public)
            </Typography>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
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
                {error && <p>{error}</p>}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    component={Link}
                    to="/pubSignup"
                  >
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

export default PubLoginPage;
