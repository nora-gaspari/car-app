import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  CircularProgress
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      const result = await login(username, password);
      
      if (result.success) {
        onLoginSuccess();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
          Faça login para acessar o catálogo de veículos
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            disabled={loading}
            autoFocus
          />
          
          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Entrar"}
          </Button>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Usuários de teste:
          </Typography>
          <Typography variant="body2" component="div">
            • <strong>admin</strong> / admin123<br/>
            • <strong>user1</strong> / user123<br/>
            • <strong>user2</strong> / user456
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
