import React, { useEffect } from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import FeatureCard from "../../widgets/FeatureCard";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const features = [
  {
    title: "Refer a Case",
    description:
      "Easily refer cases by filling out a form with details like case type, urgency, location, and referral fee.",
    linkTo: "/refer-case",
    image:
      "https://media.istockphoto.com/id/1167366632/photo/referrals-word-from-wooden-blocks-with-letters.jpg?b=1&s=612x612&w=0&k=20&c=LOnLVjdPnVxeEfUnoC1d8LfkpD0Bcu-t-RWvILaQDMI=",
  },
  {
    title: "View Cases",
    description:
      "Browse through a list of referred cases with filtering options for type, location, and fee range.",
    linkTo: "/view-cases",
    image:
      "https://images.pexels.com/photos/8382083/pexels-photo-8382083.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "My Referrals",
    description:
      "Track all the cases you’ve referred along with their status: pending, accepted, or completed.",
    linkTo: "/my-referrals",
    image:
      "https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const Home = () => {
  const navigate = useNavigate(); // using navigate for programmatic navigation
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Log the user state when the component renders
    console.log("User state on Home page:", user);
  }, [user]); // Runs whenever the user state changes

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "url('https://images.pexels.com/photos/461049/pexels-photo-461049.jpeg?auto=compress&cs=tinysrgb&w=600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <Container maxWidth="md" textAlign="center">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Welcome to Case Referral Platform
          </Typography>
          <Typography variant="h5" gutterBottom>
            A seamless way to refer and manage cases with ease and efficiency.
          </Typography>
          <Link to="/refer-case">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ mt: 3, px: 4, py: 1.5 }}
            >
              Get Started
            </Button>
          </Link>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={8} bgcolor="background.default">
        <Container>
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
            color="primary"
          >
            Explore
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} mb={8}>
                <FeatureCard
                  feature={feature}
                  // Using onClick to navigate programmatically
                  onClick={() => navigate(feature.linkTo)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 6,
          backgroundImage: "linear-gradient(to right, #3f51b5, #5c6bc0)",
          color: "#fff",
        }}
      >
        <Container maxWidth="md" textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" gutterBottom>
            Sign up now and explore the Case Referral Platform!
          </Typography>
          <Link to="/register">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ mt: 3, px: 4, py: 1.5 }}
            >
              Join Now
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
