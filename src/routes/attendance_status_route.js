const express = require("express");
const attendanceStatusController = require("../controllers/attendance_status_controller");
const router = express.Router();

//CREATE - POST
router.post("/", attendanceStatusController.createNewAttendanceStatus);

//READ - GET
router.get("/", attendanceStatusController.getAllAttendanceStatus);

//UPDATE - PATCH
router.patch("/:id", attendanceStatusController.updateAttendanceStatus);

//DELETE - DELETE
router.delete("/:id", attendanceStatusController.deleteAttendanceStatus);

module.exports = router;
