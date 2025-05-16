// src/components/SearchForm.jsx
import React, { useState } from "react";
import { useVehicleContext } from "../contexts/VeiculoContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ErroMsg from "./ErroMsg";

export default function SearchForm() {
  const { fetchVehicles, clearVehicles, loading, dispatch } =
    useVehicleContext();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const makeTrimmed = make.trim();
    const modelTrimmed = model.trim();

    if (!makeTrimmed) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "O campo 'Marca' é obrigatório.",
      });
      return;
    }

    dispatch({ type: "FETCH_ERROR", payload: null }); // Limpa erro anterior
    fetchVehicles(makeTrimmed, modelTrimmed);
  };

  const handleClear = () => {
    setMake("");
    setModel("");
    dispatch({ type: "FETCH_ERROR", payload: null }); // Limpa erro ao limpar
    clearVehicles();
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <TextField
          label="Marca *"
          variant="outlined"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
          sx={{ flex: "1 1 200px" }}
        />
        <TextField
          label="Modelo"
          variant="outlined"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          sx={{ flex: "1 1 200px" }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? "Buscando..." : "Buscar"}
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={handleClear}
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          Limpar
        </Button>
      </Box>
      <ErroMsg />
    </>
  );
}
