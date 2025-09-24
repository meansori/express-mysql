const express = require("express");
const participantsController = require("../controllers/participants_controller");
const router = express.Router();

//CREATE - POST
router.post("/", participantsController.createNewParticipant);

//READ - GET
router.get("/", participantsController.getAllParticipants);

//UPDATE - PATCH
router.patch("/:id", participantsController.updateParticipant);

//DELETE - DELETE
router.delete("/:id", participantsController.deleteParticipant);

module.exports = router;
