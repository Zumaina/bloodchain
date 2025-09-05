import React, { useEffect, useState } from "react";
import { Container, Typography, Tabs, Tab, Box, Grid, Alert } from "@mui/material";
import api from "../utils/api";
import BloodBankCard from "../components/BloodBankCard";
import HospitalCard from "../components/HospitalCard";
import LoadingSpinner from "../components/LoadingSpinner";

const DonatePage = () => {
  const [tab, setTab] = useState(0);

  // Blood Banks
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [errorBanks, setErrorBanks] = useState(null);

  // Hospitals
  const [hospitals, setHospitals] = useState([]);
  const [loadingHosp, setLoadingHosp] = useState(true);
  const [errorHosp, setErrorHosp] = useState(null);

  // Fetch Blood Banks
  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const res = await api.get("/blood-banks");
        setBloodBanks(res.data);
      } catch (err) {
        setErrorBanks("Failed to load blood banks");
      } finally {
        setLoadingBanks(false);
      }
    };
    fetchBloodBanks();
  }, []);

  // Fetch Hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await api.get("/hospitals");
        setHospitals(res.data);
      } catch (err) {
        setErrorHosp("Failed to load hospitals");
      } finally {
        setLoadingHosp(false);
      }
    };
    fetchHospitals();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Donate
      </Typography>

      {/* Tabs */}
      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
        <Tab label="Blood Banks" />
        <Tab label="Hospitals" />
        <Tab label="Blood Requests" />
      </Tabs>

      {/* Blood Banks Tab */}
      {tab === 0 && (
        <Box sx={{ mt: 3 }}>
          {loadingBanks ? (
            <LoadingSpinner label="Fetching blood banks..." />
          ) : errorBanks ? (
            <Alert severity="error">{errorBanks}</Alert>
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

      {/* Hospitals Tab */}
      {tab === 1 && (
        <Box sx={{ mt: 3 }}>
          {loadingHosp ? (
            <LoadingSpinner label="Fetching hospitals..." />
          ) : errorHosp ? (
            <Alert severity="error">{errorHosp}</Alert>
          ) : (
            <Grid container justifyContent="center">
              {hospitals.map((hosp) => (
                <Grid item xs={12} sm={6} md={4} key={hosp._id}>
                  <HospitalCard
                    name={hosp.name}
                    location={hosp.location}
                    phone={hosp.phone}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Blood Requests Tab */}
      {tab === 2 && (
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
