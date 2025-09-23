const express = require("express");
const participantCategoriesController = require("../controllers/participant_categories_controller");
const router = express.Router();

//CREATE - POST
router.post("/", participantCategoriesController.createNewParticipantCategories);

//READ - GET
router.get("/", participantCategoriesController.getAllParticipantCategories);

//UPDATE - PATCH
router.patch("/:id", participantCategoriesController.updateParticipantCategories);

//DELETE - DELETE
router.delete("/:id", participantCategoriesController.deleteParticipantCategories);

module.exports = router;
