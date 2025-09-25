const express = require("express");
const eventsController = require("../controllers/events_controller");
const router = express.Router();

//CREATE - POST
router.post("/", eventsController.createNewEvent);

//READ - GET
router.get("/", eventsController.getAllEvents);
router.get("/:id", eventsController.getEventById);

//UPDATE - PATCH
router.patch("/:id", eventsController.updateEvent);

//DELETE - DELETE
router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
