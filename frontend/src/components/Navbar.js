import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // ✅ NEW
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import useAuthContext from "../hooks/useAuthContext"; // ✅ NEW

// Create a custom button with highly visible click feedback for navbar
const NavbarButton = ({
  children,
  to,
  color = "inherit",
  onClick,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 100);
    if (onClick) onClick(e);
  };

  return (
    <Button
      component={Link}
      to={to}
      color={color}
      onClick={handleClick}
      sx={{
        transition: "all 0.15s ease",
        transform: isClicked ? "scale(0.85)" : "scale(1)",
        backgroundColor: isClicked ? "rgba(255, 255, 255, 0.3)" : "transparent",
        borderRadius: "6px",
        mx: 0.5,
        fontWeight: "bold",
        border: isClicked ? "2px solid white" : "2px solid transparent",
        boxShadow: isClicked ? "0 0 15px rgba(255, 255, 255, 0.7)" : "none",
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const { isAuthenticated, user } = useAuthContext(); // ✅ NEW

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const handleMenuItemClick = (item) => {
    setActiveMenu(item);
    handleMenuClose();
    setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  // ✅ Build mobile menu items based on auth state (minimal change)
  const mobilePaths = isAuthenticated
    ? ["/", "/donate", "/request", "/donors", "/profile"]
    : ["/", "/donate", "/request", "/donors", "/login", "/register"];

  const mobileLabels = isAuthenticated
    ? ["Home", "Donate", "Request", "Donors", "Profile"]
    : ["Home", "Donate", "Request", "Donors", "Login", "Register"];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#b71c1c" }}>
      <Toolbar>
        <Box component="img" src={logo1} alt="App Logo" sx={{ height: 40, marginRight: 1 }} />
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

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <NavbarButton to="/">Home</NavbarButton>
          <NavbarButton to="/donate">Donate</NavbarButton>
          <NavbarButton to="/request">Request</NavbarButton>
          <NavbarButton to="/donors">Donors</NavbarButton>

          {/* ✅ Auth-aware section (minimal, only this part changes) */}
          {!isAuthenticated ? (
            <>
              <NavbarButton to="/login">Login</NavbarButton>
              <NavbarButton to="/register">Register</NavbarButton>
            </>
          ) : (
            <NavbarButton
              to="/profile"
              startIcon={<AccountCircleIcon />}
              sx={{ ml: 1 }}
            >
              {user?.name ? user.name.split(" ")[0] : "Profile"}
            </NavbarButton>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
            sx={{
              transition: "all 0.2s ease",
              transform: anchorEl ? "scale(0.9)" : "scale(1)",
              backgroundColor: anchorEl ? "rgba(255, 255, 255, 0.3)" : "transparent",
              border: anchorEl ? "2px solid white" : "2px solid transparent",
              boxShadow: anchorEl ? "0 0 15px rgba(255, 255, 255, 0.7)" : "none",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "#b71c1c",
                color: "white",
              },
            }}
          >
            {mobilePaths.map((path, index) => (
              <MenuItem
                key={path}
                component={Link}
                to={path}
                onClick={() => handleMenuItemClick(path)}
                sx={{
                  transition: "all 0.2s ease",
                  backgroundColor:
                    activeMenu === path ? "rgba(255, 255, 255, 0.3)" : "transparent",
                  fontWeight: "bold",
                  transform: activeMenu === path ? "scale(0.95)" : "scale(1)",
                  border: activeMenu === path ? "2px solid white" : "2px solid transparent",
                  margin: "4px 8px",
                  borderRadius: "4px",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                {mobileLabels[index]}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
