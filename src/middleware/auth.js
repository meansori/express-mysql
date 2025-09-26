const jwt = require("jsonwebtoken");
const Auth = require("../models/auth_model");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-event-management";

const authMiddleware = {
  // Generate JWT Token
  generateToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role_id: user.role_id,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
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

      const decoded = jwt.verify(token, JWT_SECRET);
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
