const attendanceStatusModel = require("../models/attendance_status_model");

const getAllAttendanceStatus = async (req, res) => {
  try {
    const [data] = await attendanceStatusModel.getAllAttendanceStatus();
    res.status(200).json({
      msg: "GET all attendance status success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const createNewAttendanceStatus = async (req, res) => {
  const { body } = req;

  try {
    await attendanceStatusModel.createNewAttendanceStatus(body);
    res.status(201).json({
      msg: "CREATE new attendance status success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const updateAttendanceStatus = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    await attendanceStatusModel.updateAttendanceStatus(body, id);
    res.status(201).json({
      msg: "UPDATE attendance status success",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};
const deleteAttendanceStatus = async (req, res) => {
  const { id } = req.params;

  try {
    await attendanceStatusModel.deleteAttendanceStatus(id);
    res.status(200).json({
      msg: "DELETE attendance status success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

module.exports = {
  getAllAttendanceStatus,
  createNewAttendanceStatus,
  updateAttendanceStatus,
  deleteAttendanceStatus,
};
