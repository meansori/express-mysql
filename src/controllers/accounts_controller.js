const accountsModel = require("../models/accounts_model");

const getAllAccounts = async (req, res) => {
  try {
    const [data] = await accountsModel.getAllAccounts();
    res.status(200).json({
      msg: "GET all accounts success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const createNewAccount = async (req, res) => {
  const { body } = req;

  try {
    await accountsModel.createNewAccount(body);
    res.status(201).json({
      msg: "CREATE new accounts success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const updateAccount = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    await accountsModel.updateAccount(body, id);
    res.status(201).json({
      msg: "UPDATE accounts success",
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
const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    await accountsModel.deleteAccount(id);
    res.status(200).json({
      msg: "DELETE accounts success",
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
  getAllAccounts,
  createNewAccount,
  updateAccount,
  deleteAccount,
};
