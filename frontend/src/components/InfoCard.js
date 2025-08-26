import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";

const InfoCard = ({ title, content, link }) => {
  return (
    <Card sx={{ minHeight: 180, maxWidth: 300, m: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          component={Link}
          to={link}
          size="small"
          variant="contained"
          color="primary"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default InfoCard;
