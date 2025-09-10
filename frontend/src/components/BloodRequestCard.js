import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import useAuthContext from "../hooks/useAuthContext";
import api from "../utils/api";

const BloodRequestCard = ({ request, onUpdate }) => {
  const { user } = useAuthContext();
  const isRequester = user && request.user._id === user._id;

  const handleMarkFulfilled = async () => {
    try {
      await api.put(`/blood-requests/${request._id}/fulfilled`);
      onUpdate(); // Refresh the list
    } catch (error) {
      console.error("Error marking request as fulfilled:", error);
    }
  };

  const handleCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <Card
      sx={{
        width: 350,
        m: 2,
        border: request.isFulfilled ? "2px solid #4caf50" : "2px solid transparent",
        opacity: request.isFulfilled ? 0.8 : 1,
      }}
    >
      <CardContent>
        {/* Header with Name and Status */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
            {request.name}
          </Typography>
          <Chip
            label={request.bloodGroup}
            color="error"
            size="small"
            sx={{ fontWeight: "bold", ml: 1 }}
          />
        </Box>

        {/* Requester Information */}
        <Box sx={{ mb: 2, p: 1.5, backgroundColor: 'rgba(183, 28, 28, 0.05)', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PersonIcon sx={{ color: "red", mr: 1, fontSize: 20 }} />
            <Typography variant="body2" fontWeight="medium">
              Requested by: {request.user.name}
            </Typography>
          </Box>
          
          {/* Always show phone number section */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ color: "green", mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                {request.user.phone || "No phone provided"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Patient Details */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <BloodtypeIcon sx={{ color: "red", mr: 1, fontSize: 20 }} />
            <Typography variant="body2">
              {request.gender}, {request.age} years • {request.bags} bag(s)
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <EventIcon sx={{ color: "primary.main", mr: 1, fontSize: 20 }} />
            <Typography variant="body2">{new Date(request.date).toLocaleDateString()}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <AccessTimeIcon sx={{ color: "primary.main", mr: 1, fontSize: 20 }} />
            <Typography variant="body2">{request.time}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <PlaceIcon sx={{ color: "red", mr: 1, fontSize: 20 }} />
            <Typography variant="body2">{request.place}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Fulfillment Section */}
        {request.isFulfilled ? (
          <Box sx={{ textAlign: "center", py: 1 }}>
            <Chip
              label="Request Fulfilled"
              color="success"
              variant="outlined"
              sx={{ fontWeight: "bold" }}
            />
            {isRequester && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Thank you for updating the status!
              </Typography>
            )}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              {/* Call Button - Show even if no phone, but disable if no phone */}
              <Button
                variant="contained"
                size="small"
                startIcon={<PhoneIcon />}
                onClick={() => handleCall(request.user.phone)}
                disabled={!request.user.phone}
                sx={{
                  borderRadius: 2,
                  backgroundColor: request.user.phone ? 'green' : 'grey.300',
                  color: 'white',
                  '&:hover': request.user.phone ? { backgroundColor: 'darkgreen' } : { backgroundColor: 'grey.300' },
                  minWidth: '80px'
                }}
              >
                Call
              </Button>
              
              {/* Fulfilled Button - Only for requester */}
              {isRequester ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleMarkFulfilled}
                  sx={{
                    borderRadius: 2,
                    minWidth: '100px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    '&:hover': { backgroundColor: '#1565c0' }
                  }}
                >
                  Fulfilled
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  disabled
                  sx={{
                    backgroundColor: "grey.300",
                    color: "grey.600",
                    borderRadius: 2,
                    minWidth: '100px',
                    "&:hover": { backgroundColor: "grey.300" },
                  }}
                >
                  Fulfilled
                </Button>
              )}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BloodRequestCard;