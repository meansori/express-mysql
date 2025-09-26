const jwt = require("jsonwebtoken");
const Auth = require("../models/auth_model");
require("dotenv").config(); // ⬅️ tambahkan jika belum ada di server.js

const authMiddleware = {
  // Generate JWT Token
  generateToken: (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  },

  // Verify JWT Token Middleware
  verifyToken: async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Access denied. No token provided.",
        });
      }

      // ✅ Gunakan process.env.JWT_SECRET langsung
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Auth.verifyToken(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid or user not found.",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("JWT Verify Error:", error.message); // 🔎 untuk debugging
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired.",
      });
    }
  },

  // Role-based authorization middleware
  requireRole: (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      if (!roles.includes(req.user.role_id)) {
        return res.status(403).json({
          success: false,
          message: "Access denied. Insufficient permissions.",
        });
      }

      next();
    };
  },
};

module.exports = authMiddleware;
