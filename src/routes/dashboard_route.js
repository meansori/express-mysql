const express = require("express");
const dashboardController = require("../controllers/dashboard_controller");
const router = express.Router();

router.get("/event-stats", dashboardController.getAllEventStats);

module.exports = router;
