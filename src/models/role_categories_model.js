const dbPool = require("../config/database");

const getAllRoleCategories = () => {
  const sqlQuery = `SELECT * FROM role_categories `;

  return dbPool.execute(sqlQuery);
};

const createNewRoleCategory = (body) => {
  const sqlQuery = `INSERT INTO role_categories (name,role) 
                    VALUES ('${body.name}','${body.role}')`;

  return dbPool.execute(sqlQuery);
};

const updateRoleCategory = (body, id) => {
  const sqlQuery = `UPDATE role_categories
                    SET 
                    name = '${body.name}',
                    role = '${body.role}'
                    WHERE id = ${id}
                    `;

  return dbPool.execute(sqlQuery);
};
const deleteRoleCategory = (id) => {
  const sqlQuery = `DELETE FROM role_categories WHERE id = ${id}`;

  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllRoleCategories,
  createNewRoleCategory,
  updateRoleCategory,
  deleteRoleCategory,
};
