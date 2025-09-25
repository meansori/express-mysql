const dashboardModel = require("../models/dashboard_model");

const getAllEventStats = async (req, res) => {
  try {
    const data = await dashboardModel.getAllEventStats();
    res.status(200).json({
      msg: "GET all total event success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

module.exports = {
  getAllEventStats,
};
