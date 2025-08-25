import React from "react";
import { Box, Typography, Button } from "@mui/material";
import donationImage from "../assets/donation.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-around",
          padding: 4,
          flexGrow: 1,
          gap: 4,
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
            Donate <span style={{ color: "red" }}>Blood</span>, Save{" "}
            <span style={{ color: "green" }}>Lives</span>
          </Typography>

          <Box sx={{ marginTop: 3 }}>
            <Button
              component={Link}
              to="/donor-register"
              variant="contained"
              color="error"
              size="large"
              sx={{ marginRight: 2 }}
            >
              Become a Donor
            </Button>

            <Button
              component={Link}
              to="/request"
              variant="outlined"
              color="error"
              size="large"
            >
              Request Blood
            </Button>
          </Box>
        </Box>
      </Box>

      {/* About Us Section */}
      <Box sx={{ textAlign: "center", mt: 6, mb: 6 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "red" }}
        >
          About Us
        </Typography>

        {/* Our Mission Title (Above the two text boxes) */}
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 4, mb: 2 }}
        >
          Our Mission
        </Typography>

        {/* Two Text Boxes */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 3,
            mt: 3,
            alignItems: "stretch",
          }}
        >
          {/* Box 1 */}
          <Box
            sx={{
              width: { xs: "90%", md: "40%" },
              bgcolor: "#ffeaea",
              p: 3,
              borderRadius: 2,
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1">
              At BloodConnect, we’re dedicated to bridging the gap between blood
              donors and those in need through a user-friendly platform. Our
              mission is to ensure that no life is lost due to blood shortage by
              creating a responsive community of donors ready to help at a
              moment’s notice.
            </Typography>
          </Box>

          {/* Box 2 */}
          <Box
            sx={{
              width: { xs: "90%", md: "40%" },
              bgcolor: "#ffeaea",
              p: 3,
              borderRadius: 2,
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1">
              Founded in 2025, we’ve grown from a small community initiative to
              a nationwide network of compassionate individuals committed to
              saving lives through blood donation. Together, we’re making a
              meaningful difference in emergency medical care across the
              country.
            </Typography>
          </Box>
        </Box>

        {/* What We Do Section */}
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 6 }}
        >
          What We Do
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: 3,
            mt: 3,
            px: { xs: 2, md: 6 },
          }}
        >
          {/* Card 1 */}
          <Box
            sx={{
              bgcolor: "#fff0f0",
              p: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Connect Donors
            </Typography>
            <Typography variant="body2">
              We help you find blood donors in your area based on blood type and
              urgency with our advanced matching system.
            </Typography>
          </Box>

          {/* Card 2 */}
          <Box
            sx={{
              bgcolor: "#fff0f0",
              p: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Direct Communication
            </Typography>
            <Typography variant="body2">
              Our platform enables secure direct messaging between donors and
              recipients, maintaining privacy while facilitating coordination.
            </Typography>
          </Box>

          {/* Card 3 */}
          <Box
            sx={{
              bgcolor: "#fff0f0",
              p: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Blood Request Notifications
            </Typography>
            <Typography variant="body2">
              Receive real-time alerts for urgent blood requests in your area,
              allowing you to respond quickly to critical needs.
            </Typography>
          </Box>

          {/* Card 4 */}
          <Box
            sx={{
              bgcolor: "#fff0f0",
              p: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Blood Bank Network
            </Typography>
            <Typography variant="body2">
              We partner with blood banks nationwide to ensure availability
              during emergencies and maintain a reliable supply chain.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
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
