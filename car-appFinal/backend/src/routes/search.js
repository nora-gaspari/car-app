const express = require("express");
const NodeCache = require("node-cache");
const Vehicle = require("../models/Vehicle");
const { authenticateToken } = require("../config/auth");

const router = express.Router();

const cache = new NodeCache({ stdTTL: 300 });

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { make, model, year, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const cacheKey = `vehicles_${JSON.stringify(req.query)}`;
    const cachedResult = cache.get(cacheKey);
    
    if (cachedResult) {
      console.log(`Busca de veículos (cache): ${req.user.username} - IP: ${req.ip}`);
      return res.json(cachedResult);
    }

    const filters = {};
    
    if (make) filters.make = new RegExp(make, "i");
    if (model) filters.model = new RegExp(model, "i");
    if (year) filters.year = parseInt(year);
    if (color) filters.color = new RegExp(color, "i");
    
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const vehicles = await Vehicle.find(filters)
      .populate("owner", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Vehicle.countDocuments(filters);

    const result = {
      vehicles,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        limit: limitNum
      }
    };

    cache.set(cacheKey, result);

    console.log(`Busca de veículos: ${req.user.username} - ${vehicles.length} resultados - IP: ${req.ip}`);
    
    res.json(result);

  } catch (error) {
    console.error("Erro na busca de veículos:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
      error: "INTERNAL_SERVER_ERROR"
    });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "ID de veículo inválido",
        error: "INVALID_VEHICLE_ID"
      });
    }

    const vehicle = await Vehicle.findById(id).populate("owner", "username");

    if (!vehicle) {
      return res.status(404).json({
        message: "Veículo não encontrado",
        error: "VEHICLE_NOT_FOUND"
      });
    }

    console.log(`Busca de veículo específico: ${req.user.username} - ${id} - IP: ${req.ip}`);
    
    res.json(vehicle);

  } catch (error) {
    console.error("Erro na busca de veículo específico:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
      error: "INTERNAL_SERVER_ERROR"
    });
  }
});

module.exports = router;
