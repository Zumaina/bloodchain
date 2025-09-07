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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

const ProfilePage = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card sx={{ p: 2, borderRadius: 3 }}>
        <CardContent>
          <Stack direction="column" alignItems="center" spacing={2}>
            
            <Avatar sx={{ width: 72, height: 72 }}>
              {user?.name ? getInitials(user.name) : <AccountCircleIcon />}
            </Avatar>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" fontWeight={700}>
                {user?.name || "—"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || "—"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.phone || "—"}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Button variant="outlined" color="error" onClick={logout}>
                Logout
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
