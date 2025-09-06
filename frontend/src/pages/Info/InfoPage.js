import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Paper, Divider } from "@mui/material";

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
    <Box
      sx={{
        p: { xs: 2, md: 6 },
        minHeight: "80vh",
        background: "linear-gradient(135deg, #ffeaea 0%, #fff8f0 100%)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          backgroundColor: "#fff0f0",
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#d32f2f", textAlign: "center" }}
        >
          {info?.title || "No title available"}
        </Typography>

        <Divider sx={{ mb: 2, borderColor: "#d32f2f" }} />

        <Box component="ul" sx={{ pl: 3 }}>
          {info.content.split("\n\n").map((line, idx) => (
            <li
              key={idx}
              style={{
                marginBottom: "12px",
                lineHeight: "1.6",
                color: "#5c2a2a",
                fontSize: "1rem",
              }}
            >
              {line}
            </li>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default InfoPage;
