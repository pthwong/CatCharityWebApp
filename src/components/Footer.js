import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        The Pet Shelter
      </Link>{" "}
      {2023}
      {"."}
    </Typography>
  );
}

export default Footer;
