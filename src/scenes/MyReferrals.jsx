import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Collapse,
  Divider,
} from "@mui/material";
import axios from "axios";

const MyReferrals = () => {
  const user = useSelector((state) => state.user);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null); // State to track which card is expanded

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchReferrals = async () => {
      if (!token) {
        setError("Authentication token is missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/api/v1/cases/user/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReferrals(response.data);
      } catch (err) {
        setError(
          err.response?.data?.messages?.[0] ||
            "Failed to fetch referrals. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchReferrals();
    } else {
      setError("User ID is missing. Please log in.");
      setLoading(false);
    }
  }, [user, token, API_URL]);

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id); // Toggle the expanded state
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
        My Referrals
      </Typography>
      {referrals.length === 0 ? (
        <Typography variant="body1" textAlign="center">
          No referrals available at the moment.
        </Typography>
      ) : (
        <List>
          {referrals.map((referral) => (
            <ListItem
              key={referral.id}
              sx={{
                mb: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                padding: 2,
              }}
            >
              <Card sx={{ width: "100%", boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{referral.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {referral.type} | Status: Pending
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleExpandClick(referral.id)}
                  >
                    {expanded === referral.id ? "Hide Details" : "View Details"}
                  </Button>
                </CardContent>

                {/* Collapsible Details */}
                <Collapse
                  in={expanded === referral.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent sx={{ backgroundColor: "#fafafa" }}>
                    <Divider sx={{ mb: 2 }} />
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      <strong>Description:</strong> {referral.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      <strong>Location:</strong> {referral.location}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      <strong>Urgency:</strong> {referral.urgency}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      gutterBottom
                    >
                      <strong>Fee:</strong> ${referral.fee.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default MyReferrals;
