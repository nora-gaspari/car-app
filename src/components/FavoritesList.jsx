import React from "react";
import { useVehicleContext } from "../contexts/VeiculoContext";
import VehicleCard from "./VeiculoCard";
import { Grid, Typography, Button, Box } from "@mui/material";

export default function FavoritesList() {
  const { favorites, clearFavorites } = useVehicleContext();

  if (!favorites.length) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Você não tem veículos em sua garagem.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Button variant="outlined" color="error" onClick={clearFavorites}>
          Limpar Garagem
        </Button>
      </Box>

      <Grid container spacing={3}>
        {favorites.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.Model_ID}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
