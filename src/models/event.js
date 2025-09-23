const dbPool = require("../config/database");

const getAllUser = () => {
  const sqlQuery = `SELECT * FROM users`;

  return dbPool.execute(sqlQuery);
};

const createNewUser = (body) => {
  const sqlQuery = `INSERT INTO users (nama,email,address) 
                    VALUES ('${body.nama}','${body.email}','${body.address}')`;

  return dbPool.execute(sqlQuery);
};

const updateUser = (body, idUser) => {
  const sqlQuery = `UPDATE users
                    SET 
                    nama = '${body.nama}',
                    email = '${body.email}',
                    address = '${body.address}'
                    WHERE id = ${idUser}
                    `;

  return dbPool.execute(sqlQuery);
};
const deleteUser = (idUser) => {
  const sqlQuery = `DELETE FROM users WHERE id = ${idUser}`;

  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
