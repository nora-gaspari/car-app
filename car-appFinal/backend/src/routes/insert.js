const express = require("express");
const Vehicle = require("../models/Vehicle");
const { authenticateToken } = require("../config/auth");

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { make, model, year, color, price } = req.body;

    if (!make || !model || !year) {
      return res.status(400).json({
        message: "Marca, modelo e ano são obrigatórios",
        error: "MISSING_REQUIRED_FIELDS",
        required: ["make", "model", "year"]
      });
    }

    const yearNum = parseInt(year);
    if (isNaN(yearNum)) {
      return res.status(400).json({
        message: "Ano deve ser um número válido",
        error: "INVALID_YEAR_FORMAT"
      });
    }

    let priceNum = null;
    if (price !== undefined && price !== null && price !== "") {
      priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum < 0) {
        return res.status(400).json({
          message: "Preço deve ser um número positivo",
          error: "INVALID_PRICE_FORMAT"
        });
      }
    }

    const vehicleData = {
      make: make.trim(),
      model: model.trim(),
      year: yearNum,
      owner: req.user.userId
    };

    if (color && color.trim()) {
      vehicleData.color = color.trim();
    }

    if (priceNum !== null) {
      vehicleData.price = priceNum;
    }

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();

    const createdVehicle = await Vehicle.findById(vehicle._id).populate("owner", "username");

    console.log(`Veículo inserido: ${req.user.username} - ${make} ${model} ${year} - IP: ${req.ip}`);

    res.status(201).json({
      message: "Veículo inserido com sucesso",
      vehicle: createdVehicle
    });

  } catch (error) {
    console.error("Erro na inserção de veículo:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: "Dados inválidos",
        error: "VALIDATION_ERROR",
        details: errors
      });
    }

    res.status(500).json({
      message: "Erro interno do servidor",
      error: "INTERNAL_SERVER_ERROR"
    });
  }
});

module.exports = router;
