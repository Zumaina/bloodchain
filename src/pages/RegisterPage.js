import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault(); // stop page refresh
                if (password !== confirmPassword) {
                alert("❌ Passwords do not match");
                } else {
                alert(`✅ Registered!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
                }
            }}
        >

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
            onChange={(e) => setPhone(e.target.value)}
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
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            margin="normal"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ marginTop: 3 }}
          >
            Register
          </Button>


          <Typography
            variant="body2"
            align="center"
            sx={{ marginTop: 2 }}
          >
            Already a member? <a href="/login">Login</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
