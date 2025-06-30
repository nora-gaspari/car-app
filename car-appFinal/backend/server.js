require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const searchRoutes = require("./src/routes/search");
const insertRoutes = require("./src/routes/insert");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(helmet()); 
app.use(cors()); 
app.use(compression()); 
app.use(mongoSanitize()); 

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("combined")); 

app.use((req, res, next) => {
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  res.header("X-XSS-Protection", "1; mode=block");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", searchRoutes);
app.use("/api/vehicles", insertRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Rota não encontrada",
    error: "ROUTE_NOT_FOUND",
  });
});

app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);

  res.status(err.status || 500).json({
    message: err.message || "Erro interno do servidor",
    error: "INTERNAL_SERVER_ERROR",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.error("Unhandled Promise Rejection:", err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

module.exports = app;
