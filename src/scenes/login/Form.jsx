import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Tooltip,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Upload } from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../state/index";

const Form = ({ isSignUp, setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
    password: "",
    phone: "",
    license: "",
    licenseImage: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isSignUp) {
        if (
          !formData.name ||
          !formData.specialization ||
          !formData.licenseImage
        ) {
          setError("Please fill in all required fields and upload a license.");
          setLoading(false);
          return;
        }

        if (
          formData.licenseImage &&
          !["image/jpeg", "image/png"].includes(formData.licenseImage.type)
        ) {
          setError("License image must be JPEG or PNG format.");
          setLoading(false);
          return;
        }

        const data = new FormData();
        data.append(
          "user",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            specialization: formData.specialization,
            license: formData.license,
          })
        );
        data.append("licenseImage", formData.licenseImage);

        await axios.post(`${API_URL}/api/v1/auth/register`, data);
        setSuccess("Registration successful! Please login.");
        setFormData({
          name: "",
          // specialization: "",
          email: "",
          password: "",
          phone: "",
          license: "",
          licenseImage: null,
        });
      } else {
        const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        const {
          token,
          message,
          licenseVerified,
          email,
          name,
          phone,
          license,
          userId,
        } = response.data;
        console.log(token);
        if (token) {
          dispatch(
            setUser({
              token,
              licenseVerified,
              email,
              name,
              phone,
              license,
              userId,
            })
          );
          localStorage.setItem("token", token);
          setIsAuthenticated(true); // Update authentication state
          setSuccess("Login successful!");
          navigate("/home"); // Navigate after updating state
        } else {
          setError(message || "Authentication failed.");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        {isSignUp && (
          <>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              label="Specialization"
              name="specialization"
              variant="outlined"
              required
              value={formData.specialization}
              onChange={handleInputChange}
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              startIcon={<Upload />}
            >
              Upload License
              <input
                type="file"
                name="licenseImage"
                hidden
                accept=".jpeg,.jpg,.png"
                onChange={handleInputChange}
              />
            </Button>
          </>
        )}
        <TextField
          fullWidth
          label={isSignUp ? "Email" : "Email or Mobile Number"}
          name="email"
          type="email"
          variant="outlined"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        {isSignUp && (
          <TextField
            fullWidth
            label="Mobile Number"
            name="phone"
            type="tel"
            variant="outlined"
            required
            value={formData.phone}
            onChange={handleInputChange}
          />
        )}
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          required
          value={formData.password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Submitting..." : isSignUp ? "Sign Up" : "Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default Form;
