import React from "react";
import { Box, Typography, Button } from "@mui/material";
import donationImage from "../assets/donation.jpg"; // ✅ Import the image

const HomePage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      
      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 4,
          flexGrow: 1,
        }}
      >
        {/* Left: Image */}
        <Box
          component="img"
          src={donationImage}
          alt="Blood Donation"
          sx={{ width: "40%", maxWidth: 400, borderRadius: 2 }}
        />

        <Box sx={{ textAlign: "center" }}>
  <Typography variant="h3" fontWeight="bold" gutterBottom>
    Donate <span style={{ color: "red" }}>Blood</span>, Save <span style={{ color: "green" }}>Lives</span>
  </Typography>

        <Box sx={{ marginTop: 3 }}>
            <Button
            variant="contained"
            color="error"
            size="large"
            sx={{ marginRight: 2 }}
            href="/donate"
            >
            Donate Blood
            </Button>
            <Button
            variant="outlined"
            color="error"
            size="large"
            href="/request"
            >
            Request Blood
            </Button>
        </Box>
        </Box>
        </Box>

      
      <Box sx={{ textAlign: "center", padding: 2, backgroundColor: "#f5f5f5" }}>
        <Typography variant="body2">
          Follow us on{" "}
          <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>{" "}
          |{" "}
          <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
