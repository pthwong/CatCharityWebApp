import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    setUserRole(localStorage.getItem("role"));
  }, [userEmail, userRole]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      if (data.user && data.user[nameRole]) {
        setName(data.user[nameRole]);
      }
    };
    fetchData();
  }, [userEmail, userRole]);

  const handleLogout = () => {
    // Ask the user to confirm the action
    const confirm = window.confirm(
      "Are you sure you want to logout the account?"
    );
    // Only proceed if the user confirmed the action
    if (confirm) {
      // Clear the user's information from localStorage
      localStorage.removeItem("userEmail");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("sessionExpiration");
      // Clear the username from state
      setUserEmail("");
      // Show a message that the user has been logged out
      alert("You have been logged out.");
      navigate("/");
    }
  };

  const directPersonalSettings = () => {
    navigate("/settings");
  };

  //For user menu

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component={Link}
          to="/"
          style={{ textDecoration: "none" }}
        >
          The Pet Shelter
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tabs centered>
          {/* <Tab label="Home" component={Link} to="/" />
          <Tab label="Contact" component={Link} to="/contact" /> */}
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Contact" />
        </Tabs>
        <Box sx={{ flexGrow: 1 }} />

        {userEmail ? (
          <>
            <Button
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={
                Boolean(anchorEl) ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              style={{ color: "black", textTransform: "none" }}
            >
              {name} ({userRole === "cw" ? "Charity Worker" : "Public"})
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {userRole === "pub" ? (
                <>
                  <MenuItem
                    style={{ color: "black" }}
                    component={Link}
                    to="/favourite"
                  >
                    Favourite list
                  </MenuItem>
                </>
              ) : null}

              <MenuItem
                onClick={directPersonalSettings}
                style={{ color: "black" }}
              >
                Personal Information Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} style={{ color: "black" }}>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="big"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
