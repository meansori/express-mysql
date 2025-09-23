const dbPool = require("../config/database");

const getAllParticipantCategories = () => {
  const sqlQuery = `SELECT * FROM participant_categories `;

  return dbPool.execute(sqlQuery);
};

const createNewParticipantCategories = (body) => {
  const sqlQuery = `INSERT INTO participant_categories (name,detail)
                    VALUES ('${body.name}','${body.detail}')`;

  return dbPool.execute(sqlQuery);
};

const updateParticipantCategories = (body, id) => {
  const sqlQuery = `UPDATE participant_categories
                    SET
                    name = '${body.name}',
                    detail = '${body.detail}'
                    WHERE id = ${id}
                    `;

  return dbPool.execute(sqlQuery);
};
const deleteParticipantCategories = (id) => {
  const sqlQuery = `DELETE FROM participant_categories WHERE id = ${id}`;

  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllParticipantCategories,
  createNewParticipantCategories,
  updateParticipantCategories,
  deleteParticipantCategories,
};
