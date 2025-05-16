import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { VehicleProvider } from "./contexts/VeiculoContext";
import SearchForm from "./components/SearchForm";
import VehicleList from "./components/VeiculoList";
import FavoritesList from "./components/FavoritesList";

export default function App() {
  const [view, setView] = useState("search");

  return (
    <VehicleProvider>
      <Container maxWidth="md" sx={{ pt: 4, pb: 6 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Monte sua garagem dos sonhos
        </Typography>
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
            Garagem
          </Button>
        </Box>

        {view === "search" ? (
          <>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              <hr />
              Catálogo de Veículos
            </Typography>
            <SearchForm />
            <VehicleList />
          </>
        ) : (
          <>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              <hr />
              Minha Garagem
            </Typography>
            <FavoritesList />
          </>
        )}
      </Container>
    </VehicleProvider>
  );
}
