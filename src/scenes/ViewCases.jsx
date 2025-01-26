import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Collapse,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewCases = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.user); // Access the token from Redux state
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedCaseId, setExpandedCaseId] = useState(null); // Track expanded case ID

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/cases`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
          },
        });
        setCases(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch cases. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCases();
    } else {
      setError("Unauthorized. Please log in.");
      setLoading(false);
    }
  }, [API_URL, token]);

  const handleCaseClick = (id) => {
    setExpandedCaseId((prevId) => (prevId === id ? null : id)); // Toggle expansion
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", paddingTop: "20px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ paddingTop: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: "20px", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={4}
        color="primary"
      >
        Browse Cases
      </Typography>
      {cases.length === 0 ? (
        <Typography variant="body1" textAlign="center">
          No cases available at the moment.
        </Typography>
      ) : (
        cases.map((c) => (
          <Card key={c.id} elevation={3} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {c.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type: {c.type} | Location: {c.location} | Urgency: {c.urgency} |
                Fee: ${c.fee.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => handleCaseClick(c.id)}
              >
                {expandedCaseId === c.id ? "Hide Details" : "View Details"}
              </Button>
            </CardActions>

            <Collapse in={expandedCaseId === c.id} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body1" fontWeight="bold" mt={2}>
                  Case Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Location: {c.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Urgency: {c.urgency}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Fee: ₹{c.fee.toFixed(2)}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))
      )}
    </Container>
  );
};

export default ViewCases;
