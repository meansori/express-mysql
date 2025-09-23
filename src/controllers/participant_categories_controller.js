const participantCategoriesModel = require("../models/participant_categories_model");

const getAllParticipantCategories = async (req, res) => {
  try {
    const [data] = await participantCategoriesModel.getAllParticipantCategories();
    res.status(200).json({
      msg: "GET all participant categories success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const createNewParticipantCategories = async (req, res) => {
  const { body } = req;

  try {
    await participantCategoriesModel.createNewParticipantCategories(body);
    res.status(201).json({
      msg: "CREATE new participant categories success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const updateParticipantCategories = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    await participantCategoriesModel.updateParticipantCategories(body, id);
    res.status(201).json({
      msg: "UPDATE participant categories success",
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

const deleteParticipantCategories = async (req, res) => {
  const { id } = req.params;

  try {
    await participantCategoriesModel.deleteParticipantCategories(id);
    res.status(200).json({
      msg: "DELETE participant categories success",
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
  getAllParticipantCategories,
  createNewParticipantCategories,
  updateParticipantCategories,
  deleteParticipantCategories,
};
