const participantsModel = require("../models/participants_model");

const getAllParticipants = async (req, res) => {
  try {
    const [data] = await participantsModel.getAllParticipants();
    res.status(200).json({
      msg: "GET all participants success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const createNewParticipant = async (req, res) => {
  const { body } = req;

  try {
    await participantsModel.createNewParticipant(body);
    res.status(201).json({
      msg: "CREATE new participants success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const updateParticipant = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    await participantsModel.updateParticipant(body, id);
    res.status(201).json({
      msg: "UPDATE participants success",
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

// const deleteAccount = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await participantsModel.deleteAccount(id);
//     res.status(200).json({
//       msg: "DELETE participants success",
//       data: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "Server Error",
//       error: error,
//     });
//   }
// };

module.exports = {
  getAllParticipants,
  createNewParticipant,
  updateParticipant,
  // deleteAccount,
};
