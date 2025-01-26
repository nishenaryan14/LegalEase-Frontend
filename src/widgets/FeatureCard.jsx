import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const FeatureCard = ({ feature, onClick }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        borderRadius: 3,
        height: "100%",
        transition: "transform 0.3s ease, background-color 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          backgroundColor: "rgba(26, 35, 126, 0.8)",
          color: "#fff",
        },
      }}
      onClick={onClick} // Trigger navigation onClick
    >
      <img
        src={feature.image}
        alt={feature.title}
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {feature.title}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {feature.description}
      </Typography>
    </Paper>
  );
};

export default FeatureCard;
