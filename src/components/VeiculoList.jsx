import React from "react";
import { useVehicleContext } from "../contexts/VeiculoContext";
import VehicleCard from "./VeiculoCard";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function VehicleList() {
  const { vehicles, loading, error } = useVehicleContext();

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!vehicles.length) {
    return <Typography>Digite uma marca para ver os modelos.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 3,
        maxWidth: "100%",
        px: 2,
      }}
    >
      {vehicles.map((vehicle) => (
        <Box
          key={vehicle.Model_ID}
          sx={{
            flex: "1 1 calc(33.33% - 24px)",
            maxWidth: "calc(33.33% - 24px)",
            minWidth: 250,
          }}
        >
          <VehicleCard vehicle={vehicle} />
        </Box>
      ))}
    </Box>
  );
}
