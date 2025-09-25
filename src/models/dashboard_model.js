const dbPool = require("../config/database");

const getAllEventStats = async () => {
  const totalQuery = `SELECT COUNT(*) AS total_event FROM events`;
  const pastQuery = `SELECT COUNT(*) AS event_past FROM events WHERE end_time < NOW()`;
  const ongoingQuery = `SELECT COUNT(*) AS event_ongoing FROM events WHERE start_time <= NOW() AND end_time >= NOW()`;
  const upcomingQuery = `SELECT COUNT(*) AS event_upcoming FROM events WHERE DATE(start_time) > CURDATE()`;

  // Jalankan semua query secara paralel
  const [totalResult, pastResult, ongoingResult, upcomingResult] = await Promise.all([
    dbPool.execute(totalQuery),
    dbPool.execute(pastQuery),
    dbPool.execute(ongoingQuery),
    dbPool.execute(upcomingQuery),
  ]);

  return {
    total_event: totalResult[0][0].total_event,
    event_past: pastResult[0][0].event_past,
    event_ongoing: ongoingResult[0][0].event_ongoing,
    event_upcoming: upcomingResult[0][0].event_upcoming,
  };
};

module.exports = {
  getAllEventStats,
};
