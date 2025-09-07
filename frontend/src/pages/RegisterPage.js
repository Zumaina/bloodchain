import React, { useState, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
  InputAdornment,   // NEW
  IconButton,       // NEW
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import Visibility from "@mui/icons-material/Visibility";         // NEW
import VisibilityOff from "@mui/icons-material/VisibilityOff";   // NEW

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //  NEW: visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  //  NEW: refs to keep caret position when toggling
  const passwordInputRef = useRef(null);
  const confirmInputRef = useRef(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  const { register, loading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setSnackbarMessage("❌ Please fill in all fields");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("❌ Passwords do not match");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const user = await register({ name, email, phone, password });
    if (user) {
      setSnackbarMessage("✅ Registration successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 900);
    } else {
      setSnackbarMessage(error || "Registration failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  //  NEW: helper to toggle visibility while preserving caret
  const toggleWithCaret = (ref, setter) => {
    const input = ref.current;
    let start = null;
    let end = null;
    if (input) {
      start = input.selectionStart;
      end = input.selectionEnd;
    }
    setter((prev) => !prev);
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.focus();
      try {
        if (start !== null && end !== null) {
          ref.current.setSelectionRange(start, end);
        }
      } catch {
        /* some browsers may restrict setSelectionRange on password; safe to ignore */
      }
    }, 0);
  };

  const preventMouseDown = (e) => e.preventDefault();

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            label="Phone Number"
            type="tel"
            margin="normal"
            required
            value={phone}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, "");
              setPhone(onlyDigits);
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}   //  NEW
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputRef={passwordInputRef}                 //  NEW
            InputProps={{                               //  NEW
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => toggleWithCaret(passwordInputRef, setShowPassword)}
                    onMouseDown={preventMouseDown}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}     //  NEW
            margin="normal"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            inputRef={confirmInputRef}                   //  NEW
            InputProps={{                                //  NEW
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    onClick={() => toggleWithCaret(confirmInputRef, setShowConfirm)}
                    onMouseDown={preventMouseDown}
                    edge="end"
                  >
                    {showConfirm ? <Visibility /> : <VisibilityOff />}
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
            {loading ? "Registering..." : "Register"}
          </Button>

          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Already a member?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#d32f2f",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
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

export default RegisterPage;
