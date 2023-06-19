import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Container,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePerInfoForm() {
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  const [userRole, setUserRole] = useState("");

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");

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

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    setUserRole(localStorage.getItem("role"));
  }, [userEmail, userRole]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
        },
        body: JSON.stringify({
          email: userEmail,
          role: userRole,
        }),
      });

      const data = await response.json();

      let nameRole;
      switch (userRole) {
        case "cw":
          nameRole = "cwName";
          break;
        case "pub":
          nameRole = "pubName";
          break;
        default:
          nameRole = "";
      }

      console.log(data.user);

      if (data.user && data.user[nameRole]) {
        setName(data.user[nameRole]);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [userEmail, userRole]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
        },
        body: JSON.stringify({
          name: name,
          email: userEmail,
          oldPassword,
          newPassword: newPassword,
          retypeNewPassword: retypeNewPassword,
          role: userRole,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully updated
        setMessage("User info updated successfully!");
      } else {
        // Failed to update, show the error message returned from server
        setMessage(`Failed to update user info: ${data.error}`);
      }
    } catch (error) {
      // Catch any other errors (e.g. network error)
      setMessage("An error occurred. Please try again.");
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          component="h3"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Update Personal Information
        </Typography>
        <form>
          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={userEmail}
                disabled
                sx={{ margin: "12px" }}
              />
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name..."
                sx={{ margin: "12px" }}
              />
              <TextField
                label="Old Password"
                variant="outlined"
                fullWidth
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter the password..."
                sx={{ margin: "12px" }}
                type="password"
              />
              <TextField
                label="New Password"
                variant="outlined"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter the password..."
                sx={{ margin: "12px" }}
                type="password"
              />
              <TextField
                label="Re-type New Password"
                variant="outlined"
                fullWidth
                value={retypeNewPassword}
                onChange={(e) => setRetypeNewPassword(e.target.value)}
                placeholder="Enter the password..."
                sx={{ margin: "12px" }}
                type="password"
              />
            </Grid>
            {message && <p>{message}</p>}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdateInfo}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default UpdatePerInfoForm;
