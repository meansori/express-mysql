const db = require("../config/database");

class Auth {
  // Login method
  static async login(email, password) {
    try {
      const query = `
        SELECT 
          a.id, 
          a.full_name, 
          a.email, 
          a.password, 
          a.role_id,
          r.name as role_name
        FROM accounts a 
        LEFT JOIN role_categories r ON a.role_id = r.id 
        WHERE a.email = ? AND a.password = ?
      `;

      const [results] = await db.execute(query, [email, password]);

      if (results.length === 0) {
        return null;
      }

      return results[0];
    } catch (error) {
      throw new Error(`Login error: ${error.message}`);
    }
  }

  // Get user by ID
  static async getUserById(userId) {
    try {
      const query = `
        SELECT 
          a.id, 
          a.full_name, 
          a.email, 
          a.role_id,
          r.name as role_name
        FROM accounts a 
        LEFT JOIN role_categories r ON a.role_id = r.id 
        WHERE a.id = ?
      `;

      const [results] = await db.execute(query, [userId]);

      if (results.length === 0) {
        return null;
      }

      return results[0];
    } catch (error) {
      throw new Error(`Get user error: ${error.message}`);
    }
  }

  // Verify token (untuk middleware)
  static async verifyToken(userId) {
    try {
      const query = `
        SELECT id, full_name, email, role_id 
        FROM accounts 
        WHERE id = ?
      `;

      const [results] = await db.execute(query, [userId]);

      if (results.length === 0) {
        return null;
      }

      return results[0];
    } catch (error) {
      throw new Error(`Token verification error: ${error.message}`);
    }
  }

  // Update last login
  static async updateLastLogin(userId) {
    try {
      const query = `
        UPDATE accounts 
        SET last_login = NOW() 
        WHERE id = ?
      `;

      await db.execute(query, [userId]);
      return true;
    } catch (error) {
      console.error("Update last login error:", error);
      return false;
    }
  }
}

module.exports = Auth;
