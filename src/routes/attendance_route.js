const express = require("express");
const attendanceController = require("../controllers/attendance_controller");
const router = express.Router();

//CREATE - POST
router.post("/", attendanceController.createNewAttendance);

//READ - GET
router.get("/", attendanceController.getAllAttendance);

//UPDATE - PATCH
router.patch("/:id", attendanceController.updateAttendance);

//DELETE - DELETE
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
