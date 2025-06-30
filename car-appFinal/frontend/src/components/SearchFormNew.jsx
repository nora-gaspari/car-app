import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Alert
} from "@mui/material";
import { useVehicleContext } from "../contexts/VehicleContextNew";

export default function SearchForm() {
  const { searchVehicles, loading, error } = useVehicleContext();
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    minPrice: "",
    maxPrice: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const activeFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key].trim() !== "") {
        activeFilters[key] = filters[key].trim();
      }
    });

    searchVehicles(activeFilters);
  };

  const handleClear = () => {
    setFilters({
      make: "",
      model: "",
      year: "",
      color: "",
      minPrice: "",
      maxPrice: ""
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filtros de Busca
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Marca"
              name="make"
              value={filters.make}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Modelo"
              name="model"
              value={filters.model}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Ano"
              name="year"
              type="number"
              value={filters.year}
              onChange={handleChange}
              disabled={loading}
              inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Cor"
              name="color"
              value={filters.color}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Preço mínimo (R$)"
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={handleChange}
              disabled={loading}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Preço máximo (R$)"
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={handleChange}
              disabled={loading}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            size="large"
          >
            {loading ? "Buscando..." : "Buscar Veículos"}
          </Button>
          
          <Button
            type="button"
            variant="outlined"
            onClick={handleClear}
            disabled={loading}
            size="large"
          >
            Limpar Filtros
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
