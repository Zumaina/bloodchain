import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import api from "../utils/api";

const RequestPage = () => {
  const [formData, setFormData] = useState({
    name: "", 
    age: "",
    gender: "",
    bloodGroup: "",
    bags: "",
    date: "",
    time: "",
    place: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const fromRequestPage = location.state?.from === "/request";

  useEffect(() => {
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setLoginDialogOpen(true);
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/blood-requests", formData);
      setSnackbar({
        open: true,
        message: "Blood request submitted successfully!",
        severity: "success",
      });
      
      setTimeout(() => {
        navigate("/donate", { state: { activeTab: 2 } }); 
      }, 2000);
      
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit request";
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLoginRedirect = () => {
    setLoginDialogOpen(false);
    navigate("/login", { state: { from: "/request" } });
  };

  const handleCloseDialog = () => {
    setLoginDialogOpen(false);
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          backgroundColor: '#fff5f5',
          border: '2px solid #ff6b6b',
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          fontWeight={800} 
          align="center" 
          gutterBottom
          sx={{ 
            color: '#d32f2f',
            mb: 4
          }}
        >
          Request Blood
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Patient's Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
            disabled={!isAuthenticated}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Patient's Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            margin="normal"
            inputProps={{ min: 1, max: 120 }}
            disabled={!isAuthenticated}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            select
            label="Patient's Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            margin="normal"
            disabled={!isAuthenticated}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>

          <TextField
            fullWidth
            select
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            margin="normal"
            disabled={!isAuthenticated}
            sx={{ mb: 2 }}
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Number of Bags"
            name="bags"
            type="number"
            value={formData.bags}
            onChange={handleChange}
            required
            margin="normal"
            inputProps={{ min: 1 }}
            disabled={!isAuthenticated}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Date Needed"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            disabled={!isAuthenticated}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Time Needed"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            disabled={!isAuthenticated}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Hospital/Place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
            margin="normal"
            disabled={!isAuthenticated}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading || !isAuthenticated}
            sx={{ 
              mt: 2, 
              py: 1.5,
              backgroundColor: '#d32f2f',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#b71c1c',
              }
            }}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </Box>
      </Paper>

      <Dialog open={loginDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          Login Required
        </DialogTitle>
        <DialogContent>
          <Typography>
            You need to login first to create a blood request.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleLoginRedirect} variant="contained" sx={{ backgroundColor: '#d32f2f', '&:hover': { backgroundColor: '#b71c1c' } }}>
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RequestPage;