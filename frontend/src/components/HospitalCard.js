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

const HospitalCard = ({ name, address, phone }) => {
  // Format name: Capitalize first letter
  const formattedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <Card
      sx={{
        width: 350,
        height: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        m: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
          {formattedName}
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
          sx={{
            backgroundColor: "green",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
          href={`tel:${phone}`}
        >
          Call
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "blue",
            "&:hover": { backgroundColor: "darkblue" },
          }}
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

export default HospitalCard;
