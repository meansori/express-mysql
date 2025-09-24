const attendanceModel = require("../models/attendance_model");

const getAllAttendance = async (req, res) => {
  try {
    const [data] = await attendanceModel.getAllAttendance();
    res.status(200).json({
      msg: "GET all attendance success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const createNewAttendance = async (req, res) => {
  const { body } = req;

  try {
    await attendanceModel.createNewAttendance(body);
    res.status(201).json({
      msg: "CREATE new attendance success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const updateAttendance = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    await attendanceModel.updateAttendance(body, id);
    res.status(201).json({
      msg: "UPDATE attendance success",
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
const deleteAttendance = async (req, res) => {
  const { id } = req.params;

  try {
    await attendanceModel.deleteAttendance(id);
    res.status(200).json({
      msg: "DELETE attendance success",
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
  getAllAttendance,
  createNewAttendance,
  updateAttendance,
  deleteAttendance,
};
