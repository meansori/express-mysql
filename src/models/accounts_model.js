const dbPool = require("../config/database");

const getAllAccounts = () => {
  const sqlQuery = `SELECT * FROM accounts `;

  return dbPool.execute(sqlQuery);
};

const createNewAccount = (body) => {
  const sqlQuery = `INSERT INTO accounts (full_name,email,password,role_id)
                    VALUES ('${body.full_name}','${body.email}','${body.password}',${body.role_id})`;

  return dbPool.execute(sqlQuery);
};

const updateAccount = (body, id) => {
  const sqlQuery = `UPDATE accounts
                    SET
                    full_name = '${body.full_name}',
                    email = '${body.email}',
                    password = '${body.password}',
                    role_id = ${body.role_id}
                    WHERE id = ${id}
                    `;

  return dbPool.execute(sqlQuery);
};
const deleteAccount = (id) => {
  const sqlQuery = `DELETE FROM accounts WHERE id = ${id}`;

  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllAccounts,
  createNewAccount,
  updateAccount,
  deleteAccount,
};
