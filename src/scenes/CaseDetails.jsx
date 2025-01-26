import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const CaseDetails = () => {
  const { id } = useParams(); // Get the case ID from the URL params
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.user); // Access the token from Redux state
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/cases/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });
        setCaseDetails(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch case details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCaseDetails();
    } else {
      setError("Unauthorized. Please log in.");
      setLoading(false);
    }
  }, [API_URL, token, id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", paddingTop: "20px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ paddingTop: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!caseDetails) {
    return null; // If case details are not available, return null or a different message.
  }

  return (
    <Container maxWidth="sm" sx={{ paddingTop: "20px", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} color="primary">
          {caseDetails.title}
        </Typography>
        <Typography variant="body1" mb={2}>
          {caseDetails.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Urgency: {caseDetails.urgency} | Location: {caseDetails.location} |
          Fee: ${caseDetails.fee}
        </Typography>
      </Paper>
    </Container>
  );
};

export default CaseDetails;
