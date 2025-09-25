const dbPool = require("../config/database");

const getAllAttendance = () => {
  const sqlQuery = `SELECT 
                    events.title as event_name,
                    participants.full_name as full_name,
                    attendance_status.name as status,
                    attendance.check_in as check_in

                    FROM attendance
                    join events on attendance.event_id = events.id
                    join participants on attendance.participant_id = participants.id
                    join attendance_status on attendance.status_id = attendance_status.id
                    `;

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
