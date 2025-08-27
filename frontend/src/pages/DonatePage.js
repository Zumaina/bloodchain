import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import api from "../utils/api";
import BloodBankCard from "../components/BloodBankCard";
import LoadingSpinner from "../components/LoadingSpinner";

const DonatePage = () => {
  const [tab, setTab] = useState(0);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const res = await api.get("/blood-banks");
        setBloodBanks(res.data);
      } catch (err) {
        setError("Failed to load blood banks");
      } finally {
        setLoading(false);
      }
    };
    fetchBloodBanks();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Donate
      </Typography>

      {/* Tabs */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
        <Tab label="Blood Banks" />
        <Tab label="Blood Requests" />
      </Tabs>

      {/* Blood Banks Tab */}
      {tab === 0 && (
        <Box sx={{ mt: 3 }}>
          {loading ? (
            <LoadingSpinner label="Fetching blood banks..." />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container justifyContent="center">
              {bloodBanks.map((bank) => (
                <Grid item xs={12} sm={6} md={4} key={bank._id}>
                  <BloodBankCard
                    name={bank.name}
                    address={bank.address}
                    phone={bank.phone}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Blood Requests Tab */}
      {tab === 1 && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary">
            Blood Requests feature coming soon...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default DonatePage;
