import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Pagination
} from "@mui/material";
import { useVehicleContext } from "../contexts/VehicleContextNew";
import VehicleCard from "./VehicleCardNew";

export default function VehicleList() {
  const { vehicles, loading, error, pagination, searchVehicles } = useVehicleContext();

  const handlePageChange = (event, page) => {

    const currentFilters = {};
    searchVehicles({ ...currentFilters, page });
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Carregando veículos...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!vehicles.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="text.secondary">
          Nenhum veículo encontrado
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Tente ajustar os filtros de busca ou faça uma nova pesquisa
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Informações de resultados */}
      {pagination && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Mostrando {vehicles.length} de {pagination.total} veículos
          {pagination.pages > 1 && ` (Página ${pagination.current} de ${pagination.pages})`}
        </Typography>
      )}

      {/* Lista de veículos */}
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
            key={vehicle._id}
            sx={{
              flex: "1 1 calc(33.33% - 24px)",
              maxWidth: "calc(33.33% - 24px)",
              minWidth: 280,
            }}
          >
            <VehicleCard vehicle={vehicle} />
          </Box>
        ))}
      </Box>

      {/* Paginação */}
      {pagination && pagination.pages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={pagination.pages}
            page={pagination.current}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
}
