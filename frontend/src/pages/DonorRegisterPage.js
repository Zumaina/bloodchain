import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Paper,
  Button,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom"; 

const DonorRegisterPage = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, age, gender, bloodGroup });
    
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Donor's Information
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
          <TextField
            label="Name"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            required
            margin="normal"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            label="Gender"
            select
            fullWidth
            required
            margin="normal"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Blood Group"
            select
            fullWidth
            required
            margin="normal"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DonorRegisterPage;
