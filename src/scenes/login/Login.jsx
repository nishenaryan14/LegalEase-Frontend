import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import Form from "./Form";

const Login = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState(0); // 0 = Login, 1 = Sign Up

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 6, minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #eceff1, #ffffff)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            {activeTab === 0 ? "Welcome Back!" : "Join Us Today!"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {activeTab === 0
              ? "Login to access your account"
              : "Sign up to get started with our platform"}
          </Typography>
        </Box>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{ marginBottom: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        {activeTab === 0 && (
          <Form isSignUp={false} setIsAuthenticated={setIsAuthenticated} />
        )}
        {activeTab === 1 && <Form isSignUp={true} />}
      </Paper>
    </Container>
  );
};

export default Login;
