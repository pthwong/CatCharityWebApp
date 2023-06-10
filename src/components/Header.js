import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

function Header() {

  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    setUserEmail(localStorage.getItem('userEmail'))
  }, [userEmail]);

  const handleLogout = () => {
    // Ask the user to confirm the action
    const confirm = window.confirm('Are you sure you want to logout the account?');
    // Only proceed if the user confirmed the action
    if (confirm) {
      // Clear the user's information from localStorage
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem("sessionExpiration");
      // Clear the username from state
      setUserEmail('');
      // Show a message that the user has been logged out
      alert('You have been logged out.');
      navigate('/');
    }
  }


  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap component={Link} to="/" style={{ textDecoration: 'none' }}>
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
            <Typography variant="subtitle1" color="inherit">
              Welcome, {userEmail}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
            <Button variant="contained" color="primary" size="big" component={Link} to="/login">
            Login
            </Button>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default Header;
