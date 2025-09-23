const dbPool = require("../config/database");

const getAllParticipants = () => {
  const sqlQuery = `SELECT * FROM participants `;

  return dbPool.execute(sqlQuery);
};

const createNewParticipant = (body) => {
  const sqlQuery = `INSERT INTO participants (full_name,address,category_id)
                    VALUES ('${body.full_name}','${body.address}','${body.category_id}')`;

  return dbPool.execute(sqlQuery);
};

const updateParticipant = (body, id) => {
  const sqlQuery = `UPDATE participants
                    SET
                    full_name = '${body.full_name}',
                    address = '${body.address}',
                    category_id = '${body.category_id}'
                    WHERE id = ${id}
                    `;

  return dbPool.execute(sqlQuery);
};

// const deleteAccount = (id) => {
//   const sqlQuery = `DELETE FROM participants WHERE id = ${id}`;

//   return dbPool.execute(sqlQuery);
// };

module.exports = {
  getAllParticipants,
  createNewParticipant,
  updateParticipant,
  // deleteAccount,
};
