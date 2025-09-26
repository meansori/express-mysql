const dbPool = require("../config/database");

/**
 * ✅ Ambil semua event
 */
const getAllEvents = () => {
  const sqlQuery = `
    SELECT 
      *
    FROM events e
    ORDER BY e.start_time DESC
  `;
  return dbPool.execute(sqlQuery);
};

/**
 * ✅ Ambil event berdasarkan ID
 */
const getEventById = (id) => {
  const sqlQuery = `SELECT * FROM events WHERE id = ?`;
  return dbPool.execute(sqlQuery, [id]);
};

/**
 * ✅ Tambahkan event baru
 * - Sudah pakai prepared statement
 * - Ada validasi sederhana
 */
const createNewEvent = async (body) => {
  const { title, description, location, start_time, end_time, created_by } = body;

  // 🛑 Validasi dasar sebelum query
  if (!title || !location || !start_time || !end_time) {
    throw new Error("Field wajib tidak boleh kosong");
  }

  const sqlQuery = `
    INSERT INTO events 
      (title, description, location, start_time, end_time)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [title, description, location, start_time, end_time];
  return dbPool.execute(sqlQuery, values);
};

/**
 * ✅ Update event berdasarkan ID
 * - Aman dari injection
 * - Cek semua field
 */
const updateEvent = async (body, id) => {
  const { title, description, location, start_time, end_time } = body;

  if (!title || !location || !start_time || !end_time) {
    throw new Error("Field wajib tidak boleh kosong");
  }

  const sqlQuery = `
    UPDATE events
    SET
      title = ?,
      description = ?,
      location = ?,
      start_time = ?,
      end_time = ?
    WHERE id = ?
  `;

  const values = [title, description, location, start_time, end_time, id];
  return dbPool.execute(sqlQuery, values);
};

/**
 * ✅ Hapus event
 */
const deleteEvent = (id) => {
  const sqlQuery = `DELETE FROM events WHERE id = ?`;
  return dbPool.execute(sqlQuery, [id]);
};

module.exports = {
  getAllEvents,
  getEventById,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
