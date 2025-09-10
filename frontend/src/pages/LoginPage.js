import React, { useState, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom"; 
import useLogin from "../hooks/useLogin";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useLogin();

  const passwordInputRef = useRef(null);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setSnackbarMessage("Please enter both email and password");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const user = await login({ email, password });
    if (user) {
      setSnackbarMessage(" Login successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      
      setTimeout(() => navigate(from, { replace: true }), 900);
    } else {
      setSnackbarMessage(error || "Login failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleClickShowPassword = () => {
    const input = passwordInputRef.current;
    let start = null;
    let end = null;
    if (input) {
      start = input.selectionStart;
      end = input.selectionEnd;
    }
    setShowPassword((prev) => !prev);
    setTimeout(() => {
      if (!passwordInputRef.current) return;
      passwordInputRef.current.focus();
      try {
        if (start !== null && end !== null) {
          passwordInputRef.current.setSelectionRange(start, end);
        }
      } catch {
      }
    }, 0);
  };

  const handleMouseDownPassword = (e) => e.preventDefault();

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
              type={showPassword ? "text" : "password"}
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputRef={passwordInputRef}
              InputProps={{
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