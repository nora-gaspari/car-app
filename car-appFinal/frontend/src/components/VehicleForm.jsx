import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid
} from "@mui/material";
import { vehicleService } from "../services/api";

const VehicleForm = ({ open, onClose, onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    price: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.make || !formData.model || !formData.year) {
      setError("Marca, modelo e ano são obrigatórios");
      setLoading(false);
      return;
    }

    const year = parseInt(formData.year);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      setError("Por favor, insira um ano válido");
      setLoading(false);
      return;
    }

    if (formData.price && (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0)) {
      setError("Por favor, insira um preço válido");
      setLoading(false);
      return;
    }

    try {
      const vehicleData = {
        make: formData.make.trim(),
        model: formData.model.trim(),
        year: year,
        color: formData.color.trim() || undefined,
        price: formData.price ? parseFloat(formData.price) : undefined
      };

      const response = await vehicleService.create(vehicleData);

      setFormData({
        make: "",
        model: "",
        year: "",
        color: "",
        price: ""
      });
      
      onVehicleAdded(response.vehicle);
      onClose();
    } catch (error) {
      console.error("Erro ao inserir veículo:", error);
      setError(error.response?.data?.message || "Erro ao inserir veículo");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        make: "",
        model: "",
        year: "",
        color: "",
        price: ""
      });
      setError("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Novo Veículo</DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marca *"
                name="make"
                value={formData.make}
                onChange={handleChange}
                disabled={loading}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modelo *"
                name="model"
                value={formData.model}
                onChange={handleChange}
                disabled={loading}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ano *"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                disabled={loading}
                margin="normal"
                inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cor"
                name="color"
                value={formData.color}
                onChange={handleChange}
                disabled={loading}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Preço (R$)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                disabled={loading}
                margin="normal"
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Adicionar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VehicleForm;
