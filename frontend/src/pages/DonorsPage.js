import React from "react";
import { Container, Paper, Typography, Box } from "@mui/material";

const DonorsPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={800} align="center" gutterBottom>
          Donors
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          This is a placeholder page for donor listings and filters. 
          We’ll connect this to the database in a future checkpoint.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Planned features
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Filter donors by blood group & location<br/>
            • Contact options (secure)<br/>
            • Availability status
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonorsPage;
