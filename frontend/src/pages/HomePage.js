import React from "react";
import { Box, Typography, Button } from "@mui/material";
import donationImage from "../assets/donation.jpg"; 
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      
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
  component={Link}
  to="/donate"
  variant="contained"
  color="error"
  size="large"
  sx={{ marginRight: 2 }}
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
    <a
      href="https://www.facebook.com/profile.php?id=61578966506660&rdid=5wyxPBtQLocg0gKf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DsKZxRxw7#"
      target="_blank"
      rel="noopener noreferrer"
    >
      Facebook
    </a>{" "}
    |{" "}
    <a
      href="https://www.instagram.com/blood__chain/profilecard/?igsh=MWRmaG1wY213dnR1bg%3D%3D&fbclid=IwY2xjawL2A39leHRuA2FlbQIxMABicmlkETFaMllPcUs1VU5iSlpKMjRpAR7yUgOdo2dhBPXm2NPxMXedv6pV3dAFpOop_B_9r_NV5VeNeoISo6m6qWOXPw_aem_A0GgxgCRHboI7CTW_MKmoQ"
      target="_blank"
      rel="noopener noreferrer"
    >
      Instagram
    </a>
  </Typography>
</Box>

    </Box>
  );
};

export default HomePage;
