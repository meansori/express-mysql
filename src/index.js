const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.APP_PORT || 4000;
const HOST = process.env.APP_HOST || "localhost";

// Import routes
const dashboardRoute = require("./routes/dashboard_route");
const roleCategoriesRoute = require("./routes/role_categories_route");
const accountsRoute = require("./routes/accounts_route");
const participantCategoriesRoute = require("./routes/participant_categories_route");
const participantsRoute = require("./routes/participants_route");
const eventsRoute = require("./routes/events_route");
const attendanceStatusRoute = require("./routes/attendance_status_route");
const attendanceRoute = require("./routes/attendance_route");
const authRoute = require("./routes/auth_route");

const middlewareLogRequest = require("./middleware/logs");
const middlewareUpload = require("./middleware/multer");

const app = express();

// Middleware
app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.static("public/images"));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Debug middleware untuk log semua request
app.use((req, res, next) => {
  console.log(`📨 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Query:", req.query);
  console.log("Body:", req.body);
  next();
});

// Routes
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/role-categories", roleCategoriesRoute);
app.use("/api/v1/accounts", accountsRoute);
app.use("/api/v1/participant-categories", participantCategoriesRoute);
app.use("/api/v1/participants", participantsRoute);
app.use("/api/v1/events", eventsRoute);
app.use("/api/v1/attendance-status", attendanceStatusRoute);
app.use("/api/v1/attendance", attendanceRoute);
app.use("/api/v1/auth", authRoute);

// Root endpoint - TEST
app.get("/api/v1/", (req, res) => {
  res.json({
    success: true,
    message: "Selamat datang di API Event Management System",
    version: "1.0.0",
    endpoints: {
      auth: {
        login: "POST /api/v1/auth/login",
        profile: "GET /api/v1/auth/profile",
        logout: "POST /api/v1/auth/logout",
      },
      events: "GET /api/v1/events",
      accounts: "GET /api/v1/accounts",
    },
    timestamp: new Date().toISOString(),
  });
});

// Upload endpoint
app.post("/upload", middlewareUpload.single("photo"), (req, res) => {
  res.json({
    success: true,
    message: "Upload berhasil",
    data: {
      file: req.file ? req.file.filename : null,
    },
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("💥 Error:", err.message);
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Server running
app.listen(PORT, HOST, () => {
  console.log("=".repeat(50));
  console.log("🚀 Server Event Management System");
  console.log("=".repeat(50));
  console.log("📊 Database:", process.env.DB_NAME);
  console.log("🌐 Server URL: http://%s:%s", HOST, PORT);
  console.log("📚 Available endpoints:");
  console.log("   • API Base: http://%s:%s/api/v1/", HOST, PORT);
  console.log("   • Auth Login: http://%s:%s/api/v1/auth/login", HOST, PORT);
  console.log("   • Events: http://%s:%s/api/v1/events", HOST, PORT);
  console.log("   • Test Auth: http://%s:%s/api/v1/auth/test", HOST, PORT);
  console.log("=".repeat(50));
});
