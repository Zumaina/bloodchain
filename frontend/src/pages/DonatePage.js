import React, { useEffect, useState, useCallback } from "react";
import { Container, Typography, Tabs, Tab, Box, Grid, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import api from "../utils/api";
import BloodBankCard from "../components/BloodBankCard";
import HospitalCard from "../components/HospitalCard";
import BloodRequestCard from "../components/BloodRequestCard";
import LoadingSpinner from "../components/LoadingSpinner";

const DonatePage = () => {
  const location = useLocation();
  const [tab, setTab] = useState(location.state?.activeTab || 0);
  
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [errorBanks, setErrorBanks] = useState(null);

  const [hospitals, setHospitals] = useState([]);
  const [loadingHosp, setLoadingHosp] = useState(true);
  const [errorHosp, setErrorHosp] = useState(null);

  const [bloodRequests, setBloodRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [errorRequests, setErrorRequests] = useState(null);

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

  const fetchBloodRequests = useCallback(async () => {
    try {
      setLoadingRequests(true);
      const res = await api.get("/blood-requests");
      setBloodRequests(res.data);
      setErrorRequests(null);
    } catch (err) {
      setErrorRequests("Failed to load blood requests");
    } finally {
      setLoadingRequests(false);
    }
  }, []);

  useEffect(() => {
    fetchBloodRequests();
  }, [fetchBloodRequests]);

  const handleRequestUpdate = () => {
    fetchBloodRequests();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Donate
      </Typography>

      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
        <Tab label="Blood Banks" />
        <Tab label="Hospitals" />
        <Tab label="Blood Requests" />
      </Tabs>

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

      {tab === 2 && (
        <Box sx={{ mt: 3 }}>
          {loadingRequests ? (
            <LoadingSpinner label="Fetching blood requests..." />
          ) : errorRequests ? (
            <Alert severity="error">{errorRequests}</Alert>
          ) : bloodRequests.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
              No active blood requests at the moment.
            </Typography>
          ) : (
            <Grid container justifyContent="center">
              {bloodRequests.map((request) => (
                <Grid item xs={12} sm={6} md={4} key={request._id}>
                  <BloodRequestCard 
                    request={request} 
                    onUpdate={handleRequestUpdate} 
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Container>
  );
};

export default DonatePage;