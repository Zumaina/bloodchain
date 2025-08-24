import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";   // ✅ correct path & name

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#b71c1c" }}>
      <Toolbar>
        <Box
          component="img"
          src={logo1}   // ✅ must match import
          alt="App Logo"
          sx={{ height: 40, marginRight: 1 }}
        />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Blood Chain
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit">Donate</Button>
          <Button color="inherit" component={Link} to="/request">
            Request
          </Button>
          <Button color="inherit" component={Link} to="/donors">
            Donors
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
