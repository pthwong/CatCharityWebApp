import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  ThemeProvider,
  Paper,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function PubRegPage() {
  const [pubEmail, setPubEmail] = useState("");
  const [pubPassword1, setPubPassword1] = useState("");
  const [pubPassword2, setPubPassword2] = useState("");
  const [pubName, setPubName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

  const handleRegister = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression pattern for password with at least 8 characters, one letter, and one symbol
    const pwdRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // Check that all fields are filled out
    if (
      !pubName ||
      !pubEmail ||
      !pubPassword1 ||
      (!pubPassword2 && pubPassword2 !== pubPassword1)
    ) {
      setError("All fields must be filled out");
      return; // Stop here and don't send the form data to the server
    } else if (!emailRegex.test(pubEmail)) {
      setError("Invalid format of Email address.");
      return;
    } else if (!pwdRegex.test(pubPassword1) || !pwdRegex.test(pubPassword2)) {
      setError(
        "Password must contain at least 8 characters, 1 letter, and 1 symbol"
      );
      return;
    } else if (pubPassword2 !== pubPassword1) {
      setError("Password not match");
      return;
    }

    const response = await fetch("v1/pubRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pubName,
        pubEmail,
        pubPassword: pubPassword2,
      }),
    });

    const responseData = await response.json();

    if (responseData.status !== 500) {
      // The registration was successful
      alert("Sign up successful! You can now log in.");
      navigate("/pubLogin");
    } else {
      // Some other error occurred
      setError("An error occurred while signing up. Please try again.");
      return;
    }

    setError("");
  };

  return (
    <>
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
                Sign Up (Public)
              </Typography>
              <form onSubmit={handleRegister}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={pubName}
                      onChange={(e) => setPubName(e.target.value)}
                    />
                  </Grid>
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
                      value={pubPassword1}
                      onChange={(e) => setPubPassword1(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Re-type Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      value={pubPassword2}
                      onChange={(e) => setPubPassword2(e.target.value)}
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
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Footer />
    </>
  );
}

export default PubRegPage;
