const dbPool = require("../config/database");

const getAllAttendanceStatus = () => {
  const sqlQuery = `SELECT * FROM attendance_status `;

  return dbPool.execute(sqlQuery);
};

const createNewAttendanceStatus = (body) => {
  const sqlQuery = `INSERT INTO attendance_status (name)
                    VALUES ('${body.name}')`;

  return dbPool.execute(sqlQuery);
};

const updateAttendanceStatus = (body, id) => {
  const sqlQuery = `UPDATE attendance_status
                    SET
                    name = '${body.name}'
                    WHERE id = ${id}
                    `;

  return dbPool.execute(sqlQuery);
};
const deleteAttendanceStatus = (id) => {
  const sqlQuery = `DELETE FROM attendance_status WHERE id = ${id}`;

  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllAttendanceStatus,
  createNewAttendanceStatus,
  updateAttendanceStatus,
  deleteAttendanceStatus,
};
