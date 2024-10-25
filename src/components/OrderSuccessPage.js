import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Confetti from "react-confetti"; // For confetti effect
import useWindowSize from "react-use/lib/useWindowSize"; // Optional for confetti effect
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const { width, height } = useWindowSize(); // Used for confetti effect
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, id } = location.state || {};

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8, mb: 8 }}>
      {/* Confetti Effect */}
      <Confetti width={width} height={height} numberOfPieces={200} />

      <Card
        raised
        sx={{ padding: "20px", borderRadius: "12px", position: "relative" }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: "#4CAF50", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
            >
              Order Placed Successfully!
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
              Your order has been placed and is being processed. You will
              receive an email confirmation shortly.
            </Typography>

            {/* Order Summary */}
            <Box sx={{ width: "100%", mb: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Order Summary:
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Order ID:</Typography>
                <Typography variant="body2">{id}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Total Amount:</Typography>
                <Typography variant="body2">₹{amount}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Payment Method:</Typography>
                <Typography variant="body2">Credit Card</Typography>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Box>

            {/* Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoBack}
              sx={{
                textTransform: "none",
                fontSize: "16px",
                px: 4,
                py: 1,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderSuccessPage;
