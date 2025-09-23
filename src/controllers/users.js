const userModel = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const [data] = await userModel.getAllUser();
    res.status(200).json({
      msg: "GET all users success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;

  try {
    await userModel.createNewUser(body);
    res.status(201).json({
      msg: "CREATE new users success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { body } = req;
  const { idUser } = req.params;

  try {
    await userModel.updateUser(body, idUser);
    res.status(201).json({
      msg: "UPDATE new users success",
      data: {
        id: idUser,
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
const deleteUser = async (req, res) => {
  const { idUser } = req.params;

  try {
    await userModel.deleteUser(idUser);
    res.status(200).json({
      msg: "DELETE new users success",
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
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
