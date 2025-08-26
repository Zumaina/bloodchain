import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";

const BloodBankCard = ({ name, address, phone }) => {
  // Google Maps link generated from address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    name
  )}`;

  return (
    <Card sx={{ minHeight: 180, maxWidth: 400, m: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <PlaceIcon sx={{ color: "red", mr: 1 }} />
          <Typography variant="body2">{address}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PhoneIcon sx={{ color: "green", mr: 1 }} />
          <Typography variant="body2">{phone}</Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}
          href={`tel:${phone}`}
        >
          Call
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "blue", "&:hover": { backgroundColor: "darkblue" } }}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Location
        </Button>
      </CardActions>
    </Card>
  );
};

export default BloodBankCard;
