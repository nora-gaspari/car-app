const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, "Marca é obrigatória"],
    trim: true,
    maxlength: [50, "Marca deve ter no máximo 50 caracteres"]
  },
  model: {
    type: String,
    required: [true, "Modelo é obrigatório"],
    trim: true,
    maxlength: [50, "Modelo deve ter no máximo 50 caracteres"]
  },
  year: {
    type: Number,
    required: [true, "Ano é obrigatório"],
    min: [1900, "Ano deve ser maior que 1900"],
    max: [new Date().getFullYear() + 1, "Ano não pode ser no futuro"]
  },
  color: {
    type: String,
    trim: true,
    maxlength: [30, "Cor deve ter no máximo 30 caracteres"]
  },
  price: {
    type: Number,
    min: [0, "Preço deve ser positivo"]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

vehicleSchema.index({ make: 1, model: 1 });
vehicleSchema.index({ year: 1 });
vehicleSchema.index({ owner: 1 });

module.exports = mongoose.model("Vehicle", vehicleSchema);
