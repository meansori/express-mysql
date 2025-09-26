const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth_controller");
const authMiddleware = require("../middleware/auth");

// 👇 TEST ROUTE - Hapus nanti jika sudah berhasil
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth route is working perfectly!",
    timestamp: new Date().toISOString(),
  });
});

// Public routes
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

// Protected routes
router.get("/profile", authMiddleware.verifyToken, AuthController.getProfile);
router.get("/verify", authMiddleware.verifyToken, AuthController.verifyToken);

// Admin only route example
router.get("/admin-only", authMiddleware.verifyToken, authMiddleware.requireRole([1, 2]), (req, res) => {
  res.json({
    success: true,
    message: "Welcome admin!",
    user: req.user,
  });
});

module.exports = router;
