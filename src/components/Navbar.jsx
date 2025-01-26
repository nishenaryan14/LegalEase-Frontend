import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { logout } from "../state"; // Adjust path based on state file structure

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change state when scrolled past 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: "#ffffff",
    margin: "0 15px",
    position: "relative",
    fontSize: "16px",
    fontWeight: "500",
    "&.active": {
      fontWeight: "bold",
    },
    "&.active::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -5,
      height: "2px",
      backgroundColor: "#90caf9", // Light blue accent for underline
      animation: "underline-slide 0.3s ease-in-out",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -5,
      height: "2px",
      backgroundColor: "transparent",
      transition: "background-color 0.3s ease",
    },
    "&:hover::after": {
      backgroundColor: "#90caf9",
    },
    "@keyframes underline-slide": {
      from: {
        width: "0",
      },
      to: {
        width: "100%",
      },
    },
  }));

  const handleLogout = () => {
    // Dispatch logout action to update Redux state
    dispatch(logout());

    // Clear tokens from both localStorage and sessionStorage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to the login page after logout
    navigate("/"); // Adjust based on your actual login route
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: isScrolled ? "rgba(26, 35, 126, 0.8)" : "#1a237e", // Premium dark indigo
        boxShadow: isScrolled ? "0 4px 10px rgba(0, 0, 0, 0.3)" : "none",
        backdropFilter: isScrolled ? "blur(10px)" : "none", // Blur effect on scroll
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#90caf9", // Light blue
          }}
        >
          LegalEase
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StyledNavLink to="/home" activeClassName="active">
            Home
          </StyledNavLink>
          <StyledNavLink to="/refer-case" activeClassName="active">
            Refer a Case
          </StyledNavLink>
          <StyledNavLink to="/view-cases" activeClassName="active">
            View Cases
          </StyledNavLink>
          <StyledNavLink to="/my-referrals" activeClassName="active">
            My Referrals
          </StyledNavLink>
          <Button
            variant="outlined"
            sx={{
              color: "#ffffff",
              borderColor: "#ffffff",
              marginLeft: 2,
              textTransform: "none",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
