import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Header() {
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
        <Button variant="contained" color="primary" size="big" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
