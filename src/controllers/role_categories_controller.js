const roleCategoriesModel = require("../models/role_categories_model");

const getAllRoleCategories = async (req, res) => {
  try {
    const [data] = await roleCategoriesModel.getAllRoleCategories();
    res.status(200).json({
      msg: "GET all role categories success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const createNewRoleCategory = async (req, res) => {
  const { body } = req;

  try {
    await roleCategoriesModel.createNewRoleCategory(body);
    res.status(201).json({
      msg: "CREATE new role category success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error,
    });
  }
};

const updateRoleCategory = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    await roleCategoriesModel.updateRoleCategory(body, id);
    res.status(201).json({
      msg: "UPDATE role category success",
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
const deleteRoleCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await roleCategoriesModel.deleteRoleCategory(id);
    res.status(200).json({
      msg: "DELETE role category success",
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
  getAllRoleCategories,
  createNewRoleCategory,
  updateRoleCategory,
  deleteRoleCategory,
};
