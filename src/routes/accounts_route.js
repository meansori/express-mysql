const express = require("express");
const accountsController = require("../controllers/accounts_controller");
const router = express.Router();

//CREATE - POST
router.post("/", accountsController.createNewAccount);

//READ - GET
router.get("/", accountsController.getAllAccounts);

//UPDATE - PATCH
router.patch("/:id", accountsController.updateAccount);

//DELETE - DELETE
router.delete("/:id", accountsController.deleteAccount);

module.exports = router;
