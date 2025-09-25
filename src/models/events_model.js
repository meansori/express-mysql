const dbPool = require("../config/database");

const getAllEvents = () => {
  const sqlQuery = `SELECT 
        e.id,
        e.title,
        e.description,
        e.location,
        e.start_time,
        e.end_time,
        e.created_at,
        e.created_by
      FROM events e
      JOIN accounts a ON e.created_by = a.id
                    `;

  return dbPool.execute(sqlQuery);
};
const getEventById = (id) => {
  const sqlQuery = `SELECT * FROM events WHERE id = ${id} `;

  return dbPool.execute(sqlQuery);
};

const createNewEvent = (body) => {
  const sqlQuery = `INSERT INTO events (title,description,location,start_time,end_time,created_by)
                    VALUES ('${body.title}','${body.description}','${body.location}','${body.start_time}','${body.end_time}',${body.created_by})`;

  return dbPool.execute(sqlQuery);
};

const updateEvent = (body, id) => {
  const sqlQuery = `UPDATE events
                    SET
                    title = '${body.title}',
                    description = '${body.description}',
                    location = '${body.location}',
                    start_time = '${body.start_time}',
                    end_time = '${body.end_time}',
                    created_by = ${body.created_by}
                    WHERE id = ${id}
                    `;

  return dbPool.execute(sqlQuery);
};

const deleteEvent = (id) => {
  const sqlQuery = `DELETE FROM events WHERE id = ${id}`;

  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllEvents,
  createNewEvent,
  updateEvent,
  deleteEvent,
  getEventById,
};
