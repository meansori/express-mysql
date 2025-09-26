const mysql = require("mysql2");
console.log("ENV:", process.env.DB_USER, process.env.DB_PASSWORD);

const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = dbPool.promise();
