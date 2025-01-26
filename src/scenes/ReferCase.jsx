import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";

const ReferCase = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    type: "",
    description: "",
    location: "",
    urgency: "",
    fee: "",
  });
  const API_URL = import.meta.env.VITE_API_URL;
  const user = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (
      !formValues.title ||
      formValues.title.length < 3 ||
      formValues.title.length > 100
    ) {
      newErrors.title = "Title must be between 3 and 100 characters.";
    }
    if (!formValues.type) {
      newErrors.type = "Case type is required.";
    }
    if (
      !formValues.description ||
      formValues.description.length < 10 ||
      formValues.description.length > 1000
    ) {
      newErrors.description =
        "Description must be between 10 and 1000 characters.";
    }
    if (!formValues.location) {
      newErrors.location = "Location is required.";
    }
    if (!formValues.urgency) {
      newErrors.urgency = "Urgency is required.";
    }
    if (!formValues.fee || formValues.fee <= 0) {
      newErrors.fee = "Fee must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
    setErrors({ ...errors, [field]: null }); // Clear field-specific error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      title: formValues.title,
      description: formValues.description,
      type: formValues.type,
      location: formValues.location,
      urgency: formValues.urgency,
      fee: parseFloat(formValues.fee),
      createdBy: user?.userId,
    };

    try {
      setApiError("");
      setSuccessMessage("");

      const response = await fetch(`${API_URL}/api/v1/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.messages?.join(", ") || "API Error");
      }

      const data = await response.json();
      setSuccessMessage(`Case created successfully! Case ID: ${data.id}`);
      setFormValues({
        title: "",
        type: "",
        description: "",
        location: "",
        urgency: "",
        fee: "",
      });
    } catch (error) {
      setApiError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: "20px", paddingBottom: "25px" }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        mb={4}
        color="primary"
      >
        Refer a Case
      </Typography>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {apiError}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Case Title"
          variant="outlined"
          margin="normal"
          value={formValues.title}
          onChange={handleChange("title")}
          error={!!errors.title}
          helperText={errors.title}
        />
        <FormControl fullWidth margin="normal" error={!!errors.type}>
          <InputLabel>Case Type</InputLabel>
          <Select value={formValues.type} onChange={handleChange("type")}>
            <MenuItem value="civil">Civil</MenuItem>
            <MenuItem value="criminal">Criminal</MenuItem>
            <MenuItem value="corporate">Corporate</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {errors.type && <Typography color="error">{errors.type}</Typography>}
        </FormControl>
        <TextField
          fullWidth
          label="Case Description"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={formValues.description}
          onChange={handleChange("description")}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          margin="normal"
          value={formValues.location}
          onChange={handleChange("location")}
          error={!!errors.location}
          helperText={errors.location}
        />
        <FormControl fullWidth margin="normal" error={!!errors.urgency}>
          <InputLabel>Urgency</InputLabel>
          <Select value={formValues.urgency} onChange={handleChange("urgency")}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
          {errors.urgency && (
            <Typography color="error">{errors.urgency}</Typography>
          )}
        </FormControl>
        <TextField
          fullWidth
          label="Referral Fee"
          type="number"
          variant="outlined"
          margin="normal"
          value={formValues.fee}
          onChange={handleChange("fee")}
          error={!!errors.fee}
          helperText={errors.fee}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Submit Referral
        </Button>
      </form>
    </Container>
  );
};

export default ReferCase;
