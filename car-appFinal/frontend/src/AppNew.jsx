import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Fab
} from "@mui/material";
import { Add as AddIcon, ExitToApp as LogoutIcon } from "@mui/icons-material";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { VehicleProvider } from "./contexts/VehicleContextNew";
import Login from "./components/Login";
import SearchForm from "./components/SearchFormNew";
import VehicleList from "./components/VehicleListNew";
import FavoritesList from "./components/FavoritesListNew";
import VehicleForm from "./components/VehicleForm";

function AppContent() {
  const [view, setView] = useState("search");
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLoginSuccess = () => {
  };

  const handleVehicleAdded = (vehicle) => {

    console.log("Veículo adicionado:", vehicle);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <VehicleProvider>
      <Box sx={{ flexGrow: 1 }}>
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Monte sua garagem dos sonhos
            </Typography>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Olá, {user?.username}!
            </Typography>
            <Button
              color="inherit"
              onClick={logout}
              startIcon={<LogoutIcon />}
            >
              Sair
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
          {/* Navigation */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 4 }}>
            <Button
              variant={view === "search" ? "contained" : "outlined"}
              onClick={() => setView("search")}
              size="large"
            >
              Catálogo
            </Button>
            <Button
              variant={view === "favorites" ? "contained" : "outlined"}
              onClick={() => setView("favorites")}
              size="large"
            >
              Minha Garagem
            </Button>
          </Box>

          {/* Content */}
          {view === "search" ? (
            <>
              <Typography variant="h4" component="h1" align="center" gutterBottom>
                Catálogo de Veículos
              </Typography>
              <SearchForm />
              <VehicleList />
            </>
          ) : (
            <>
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                Minha Garagem
              </Typography>
              <FavoritesList />
            </>
          )}

          {/* Floating Action Button para adicionar veículo */}
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
            onClick={() => setShowVehicleForm(true)}
          >
            <AddIcon />
          </Fab>

          {/* Modal para adicionar veículo */}
          <VehicleForm
            open={showVehicleForm}
            onClose={() => setShowVehicleForm(false)}
            onVehicleAdded={handleVehicleAdded}
          />
        </Container>
      </Box>
    </VehicleProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
