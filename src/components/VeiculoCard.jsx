import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useVehicleContext } from "../contexts/VeiculoContext";

export default function VehicleCard({ vehicle }) {
  const { favorites, addFavorite, removeFavorite } = useVehicleContext();
  const isFav = favorites.some((v) => v.Model_ID === vehicle.Model_ID);

  const handleFav = () => {
    isFav ? removeFavorite(vehicle.Model_ID) : addFavorite(vehicle);
  };

  return (
    <Card
      sx={{
        width: 280,
        minHeight: 180,
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {vehicle.Model_Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fabricante: {vehicle.Make_Name}
          <br />
          Modelo ID: {vehicle.Model_ID}
        </Typography>

        <Box mt={2} textAlign="right">
          <Button
            variant={isFav ? "contained" : "outlined"}
            color="primary"
            size="small"
            onClick={handleFav}
          >
            {isFav ? "Remover" : "Adicionar na garagem"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
