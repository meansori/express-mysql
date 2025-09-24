const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.APP_PORT || 4000;
const HOST = process.env.APP_HOST || "localhost";

const roleCategoriesRoute = require("./routes/role_categories_route");
const accountsRoute = require("./routes/accounts_route");
const participantCategoriesRoute = require("./routes/participant_categories_route");
const participantsRoute = require("./routes/participants_route");
const eventsRoute = require("./routes/events_route");
const attendanceStatusRoute = require("./routes/attendance_status_route");
const attendanceRoute = require("./routes/attendance_route");

const middlewareLogRequest = require("./middleware/logs");
const middlewareUpload = require("./middleware/multer");

const app = express();

// Middleware
app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.static("public/images"));

// Tambahkan CORS supaya React bisa akses
app.use(
  cors({
    origin: "http://localhost:3000", // ganti dengan domain frontend kamu
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.get("/api/v1/", (req, res) => {
  res.send("Selamat datang di api app event management");
});
app.use("/api/v1/role-categories", roleCategoriesRoute);
app.use("/api/v1/accounts", accountsRoute);
app.use("/api/v1/participant-categories", participantCategoriesRoute);
app.use("/api/v1/participants", participantsRoute);
app.use("/api/v1/events", eventsRoute);
app.use("/api/v1/attendance-status", attendanceStatusRoute);
app.use("/api/v1/attendance", attendanceRoute);

// Upload endpoint
app.post("/upload", middlewareUpload.single("photo"), (req, res) => {
  res.json({
    msg: "Upload berhasil",
    file: req.file ? req.file.filename : null,
  });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    msg: err.message,
  });
});

// Server running
app.listen(PORT, () => {
  console.log(process.env.DB_NAME);
  console.log(`Server Running and Up on http://${HOST}:${PORT}`);
});
