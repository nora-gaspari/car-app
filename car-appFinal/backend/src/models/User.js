const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Nome de usuário é obrigatório"],
    unique: true,
    trim: true,
    minlength: [3, "Nome de usuário deve ter pelo menos 3 caracteres"],
    maxlength: [30, "Nome de usuário deve ter no máximo 30 caracteres"]
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatória"],
    minlength: [6, "Senha deve ter pelo menos 6 caracteres"]
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
