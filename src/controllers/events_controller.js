const eventsModel = require("../models/events_model");

const getAllEvents = async (req, res) => {
  try {
    const [data] = await eventsModel.getAllEvents();
    res.status(200).json({
      msg: "GET all events success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await eventsModel.getEventById(id);
    res.status(200).json({
      msg: "GET  events detail success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const createNewEvent = async (req, res) => {
  const { body } = req;

  try {
    await eventsModel.createNewEvent(body);
    res.status(201).json({
      msg: "CREATE new events success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const updateEvent = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    await eventsModel.updateEvent(body, id);
    res.status(201).json({
      msg: "UPDATE events success",
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

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    await eventsModel.deleteEvent(id);
    res.status(200).json({
      msg: "DELETE events success",
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
  getAllEvents,
  getEventById,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
