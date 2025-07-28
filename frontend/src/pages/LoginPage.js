import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setSnackbarMessage("❌ Please enter both email and password");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setSnackbarMessage("✅ Login successful!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // ✅ Forgot Password Page as inline component
  const ForgotPasswordPage = () => (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        This is forgot password page
      </Typography>
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={() => setShowForgotPassword(false)}
      >
        Back to Login
      </Button>
    </div>
  );

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        {!showForgotPassword ? (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>

            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ marginTop: 3 }}
              >
                Login
              </Button>

              <Typography variant="body2" align="right" sx={{ marginTop: 1 }}>
                <span
                  style={{ textDecoration: "underline", cursor: "pointer", color: "#d32f2f" }}
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </span>
              </Typography>

              <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                Don't have an account?{" "}
                <a href="/register" style={{ textDecoration: "underline" }}>
                  Register
                </a>
              </Typography>
            </Box>
          </>
        ) : (
          <ForgotPasswordPage />
        )}
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
