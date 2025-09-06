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
import useLogin from "../hooks/useLogin"; //  NEW

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  const { login, loading, error } = useLogin(); //  NEW

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setSnackbarMessage("❌ Please enter both email and password");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const user = await login({ email, password }); //  call backend
    if (user) {
      setSnackbarMessage(" Login successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/"), 900);
    } else {
      // show hook error (already set inside useLogin)
      setSnackbarMessage(error || "Login failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const ForgotPasswordPage = () => (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 2 }}>
        This is forgot password
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
                disabled={loading} //  prevent double submit
              >
                {loading ? "Logging in..." : "Login"} {/*  feedback */}
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
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "#d32f2f", fontWeight: "bold" }}
                >
                  Register
                </Link>
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
