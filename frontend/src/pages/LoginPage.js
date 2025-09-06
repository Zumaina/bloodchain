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
  InputAdornment,        // NEW
  IconButton,            // NEW
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import useLogin from "../hooks/useLogin"; //  NEW
import Visibility from "@mui/icons-material/Visibility";         //  NEW
import VisibilityOff from "@mui/icons-material/VisibilityOff";   //  NEW

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); //  NEW

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
      setSnackbarMessage(error || "Login failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev); //  NEW
  const handleMouseDownPassword = (e) => e.preventDefault();              //  NEW

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
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
              type={showPassword ? "text" : "password"}   //  NEW
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{                                //  NEW
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ marginTop: 3 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

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
