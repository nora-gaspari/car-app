// src/components/ErroMsg.jsx
import React from "react";
import Typography from "@mui/material/Typography";
import { useVehicleContext } from "../contexts/VeiculoContext";

export default function ErroMsg() {
  const { error } = useVehicleContext();

  if (!error) return null;

  return (
    <Typography
      variant="body2"
      color="error"
      sx={{ mt: 2, textAlign: "center" }}
    >
      {error}
    </Typography>
  );
}
