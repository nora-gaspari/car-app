import React from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Paper
} from "@mui/material";
import { useVehicleContext } from "../contexts/VehicleContextNew";
import VehicleCard from "./VehicleCardNew";

export default function FavoritesList() {
  const { favorites, clearFavorites } = useVehicleContext();

  if (!favorites.length) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Sua garagem está vazia
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Adicione veículos aos favoritos para vê-los aqui
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6">
          {favorites.length} veículo{favorites.length !== 1 ? "s" : ""} na sua garagem
        </Typography>
        
        <Button 
          variant="outlined" 
          color="error" 
          onClick={clearFavorites}
          size="small"
        >
          Limpar Garagem
        </Button>
      </Box>

      <Grid container spacing={3}>
        {favorites.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle._id}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
