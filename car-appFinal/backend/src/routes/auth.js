const express = require("express");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");
const { generateToken } = require("../config/auth");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: {
    message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
    error: "RATE_LIMIT_EXCEEDED"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log(`Tentativa de login falhada: campos obrigatórios ausentes - IP: ${req.ip}`);
      return res.status(400).json({
        message: "Nome de usuário e senha são obrigatórios",
        error: "MISSING_CREDENTIALS"
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      console.log(`Tentativa de login falhada: usuário não encontrado - ${username} - IP: ${req.ip}`);
      return res.status(401).json({
        message: "Credenciais inválidas",
        error: "INVALID_CREDENTIALS"
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log(`Tentativa de login falhada: senha incorreta - ${username} - IP: ${req.ip}`);
      return res.status(401).json({
        message: "Credenciais inválidas",
        error: "INVALID_CREDENTIALS"
      });
    }

    const token = generateToken(user._id, user.username);

    console.log(`Login bem-sucedido: ${username} - IP: ${req.ip}`);
    
    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
      error: "INTERNAL_SERVER_ERROR"
    });
  }
});

module.exports = router;
