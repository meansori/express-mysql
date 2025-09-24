const dbPool = require("../config/database");

const getAllAttendance = () => {
  const sqlQuery = `SELECT * FROM attendance `;

  return dbPool.execute(sqlQuery);
};

const createNewAttendance = (body) => {
  const sqlQuery = `INSERT INTO attendance (event_id,participant_id,status_id,check_in)
                    VALUES (${body.event_id},${body.participant_id},${body.status_id},'${body.check_in}')`;

  return dbPool.execute(sqlQuery);
};

const updateAttendance = (body, id) => {
  const sqlQuery = `UPDATE attendance
                    SET
                    event_id = ${body.event_id},
                    participant_id = ${body.participant_id},
                    status_id = ${body.status_id},
                    check_in = '${body.check_in}'
                    WHERE id = ${id}
                    `;

  return dbPool.execute(sqlQuery);
};

const deleteAttendance = (id) => {
  const sqlQuery = `DELETE FROM attendance WHERE id = ${id}`;

  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllAttendance,
  createNewAttendance,
  updateAttendance,
  deleteAttendance,
};
