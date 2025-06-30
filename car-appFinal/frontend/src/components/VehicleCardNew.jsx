import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider
} from "@mui/material";
import { useVehicleContext } from "../contexts/VehicleContextNew";

export default function VehicleCard({ vehicle }) {
  const { addFavorite, removeFavorite, isFavorite } = useVehicleContext();
  const isInFavorites = isFavorite(vehicle._id);

  const handleFavoriteToggle = () => {
    if (isInFavorites) {
      removeFavorite(vehicle._id);
    } else {
      addFavorite(vehicle);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "Preço não informado";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: 250,
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            {vehicle.make} {vehicle.model}
          </Typography>
          <Chip 
            label={vehicle.year} 
            color="primary" 
            size="small"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          {vehicle.color && (
            <Typography variant="body2" color="text.secondary">
              <strong>Cor:</strong> {vehicle.color}
            </Typography>
          )}
          
          <Typography variant="body2" color="text.secondary">
            <strong>Proprietário:</strong> {vehicle.owner?.username || "N/A"}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            <strong>Adicionado em:</strong> {formatDate(vehicle.createdAt)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            {formatPrice(vehicle.price)}
          </Typography>
          
          <Button
            variant={isInFavorites ? "contained" : "outlined"}
            color="primary"
            size="small"
            onClick={handleFavoriteToggle}
            sx={{ minWidth: 100 }}
          >
            {isInFavorites ? "Remover" : "Favoritar"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
