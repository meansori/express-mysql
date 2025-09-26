const Auth = require("../models/auth_model");
const authMiddleware = require("../middleware/auth");

class AuthController {
  // Login controller
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required.",
        });
      }

      // Authenticate user
      const user = await Auth.login(email, password);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      // Update last login
      await Auth.updateLastLogin(user.id);

      // Generate token
      const token = authMiddleware.generateToken(user);

      // Return user data (without password)
      const userResponse = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role_id: user.role_id,
        role_name: user.role_name,
      };

      res.json({
        success: true,
        message: "Login successful.",
        data: {
          user: userResponse,
          token: token,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during login.",
      });
    }
  }

  // Logout controller (optional - client side token removal)
  static async logout(req, res) {
    try {
      // Since we're using JWT, logout is handled client-side by removing the token
      // This endpoint can be used for logging activities if needed

      res.json({
        success: true,
        message: "Logout successful.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during logout.",
      });
    }
  }

  // Get current user profile
  static async getProfile(req, res) {
    try {
      const user = await Auth.getUserById(req.user.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      // Remove password from response
      const userResponse = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role_id: user.role_id,
        role_name: user.role_name,
      };

      res.json({
        success: true,
        data: userResponse,
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error while fetching profile.",
      });
    }
  }

  // Verify token endpoint
  static async verifyToken(req, res) {
    try {
      res.json({
        success: true,
        data: {
          user: req.user,
        },
      });
    } catch (error) {
      console.error("Verify token error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error during token verification.",
      });
    }
  }
}

module.exports = AuthController;
