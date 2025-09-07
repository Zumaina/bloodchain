import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";

const RequestPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
      <Typography variant="h4" fontWeight={800} align="center" gutterBottom>
          Request Blood
      </Typography>
    </Container>
  );
};

export default RequestPage;
