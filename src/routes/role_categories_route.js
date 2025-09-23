const express = require("express");
const roleCategories = require("../controllers/role_categories_controller");
const router = express.Router();

//READ - GET
router.get("/", roleCategories.getAllRoleCategories);

//CREATE - POST
router.post("/", roleCategories.createNewRoleCategory);

//UPDATE - PATCH
router.patch("/:id", roleCategories.updateRoleCategory);

//DELETE - DELETE
router.delete("/:id", roleCategories.deleteRoleCategory);

module.exports = router;
