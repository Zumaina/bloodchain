import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const InfoPage = () => {
  const { slug } = useParams(); 
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/info");
      const found = res.data.find((item) => item.slug === slug);
      if (!found) {
        setError("Info not found");
      } else {
        setInfo(found);
      }
    } catch (err) {
      setError("Failed to fetch info.");
    } finally {
      setLoading(false);
    }
  };

  fetchInfo();
}, [slug]);


  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {info?.title || "No title available"}
      </Typography>
      <Typography variant="body1">{info?.content || "No content available."}</Typography>
    </Box>
  );
};

export default InfoPage;
