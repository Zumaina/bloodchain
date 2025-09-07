import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  Button,
  Box,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

const InfoRow = ({ icon, label, value }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={2}
    sx={{
      p: 1.25,
      borderRadius: 2,
      bgcolor: "rgba(183, 28, 28, 0.03)", // subtle blood-red tint
    }}
  >
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: 36,
        height: 36,
        borderRadius: "50%",
        bgcolor: "rgba(183, 28, 28, 0.08)",
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        {value || "—"}
      </Typography>
    </Box>
  </Stack>
);

const ProfilePage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 8 }}>
      {/* Top banner similar to InfoPage header */}
      <Box
        sx={{
          height: 120,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, rgba(183,28,28,0.9) 0%, rgba(183,28,28,0.6) 60%, rgba(183,28,28,0.4) 100%)",
          boxShadow: "0 10px 24px rgba(183,28,28,0.25)",
          position: "relative",
        }}
      />
      <Card
        sx={{
          mt: -6,
          borderRadius: 3,
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ pt: 6 }}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                width: 88,
                height: 88,
                border: "4px solid #fff",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                mt: -10,
                bgcolor: "primary.contrastText",
                color: "primary.main",
              }}
            >
              {user?.name ? getInitials(user.name) : <AccountCircleIcon fontSize="large" />}
            </Avatar>

            <Typography variant="h5" fontWeight={800} sx={{ textAlign: "center" }}>
              {user?.name || "—"}
            </Typography>
            

            <Divider sx={{ width: "100%", my: 1.5 }} />

            <Stack spacing={1.25} sx={{ width: "100%" }}>
              <InfoRow
                icon={<PersonIcon fontSize="small" color="error" />}
                label="Name"
                value={user?.name}
              />
              <InfoRow
                icon={<EmailIcon fontSize="small" color="error" />}
                label="Email"
                value={user?.email}
              />
              <InfoRow
                icon={<LocalPhoneIcon fontSize="small" color="error" />}
                label="Phone"
                value={user?.phone}
              />
            </Stack>

            <Divider sx={{ width: "100%", my: 2 }} />

            <Button
              variant="contained"
              color="error"
              onClick={logout}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "0 8px 18px rgba(183,28,28,0.25)",
              }}
            >
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
