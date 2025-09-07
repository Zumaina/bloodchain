import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";

const RequestPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={800} align="center" gutterBottom>
          Request Blood
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          This is a placeholder page for requesting blood. 
          We’ll add the real form and logic in a future checkpoint.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Coming soon
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Request form (patient details, blood group, urgency)<br/>
            • Location & contact info<br/>
            • Submit and track request
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RequestPage;
