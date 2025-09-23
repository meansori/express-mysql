const express = require("express");
require("dotenv").config();

const PORT = process.env.DB_PORT || 4000;
const HOST = process.env.DB_HOST || "localhost";

const roleCategoriesRoute = require("./routes/role_categories_route");
const accountsRoute = require("./routes/accounts_route");
const participantCategoriesRoute = require("./routes/participant_categories_route");
const participantsRoute = require("./routes/participants_route");
const userRoutes = require("./routes/users");

const middlewareLogRequest = require("./middleware/logs");
const middlewareUpload = require("./middleware/multer");

const app = express();

app.use(middlewareLogRequest);

app.use(express.json());
app.use(express.static("public/images"));

app.get("/api/v1/", (req, res) => {
  res.send("Selamat datang di api app event management");
});
app.use("/api/v1/role-categories", roleCategoriesRoute);
app.use("/api/v1/accounts", accountsRoute);
app.use("/api/v1/participant-categories", participantCategoriesRoute);
app.use("/api/v1/participants", participantsRoute);
app.use("/api/v1/users", userRoutes);

app.post("/upload", middlewareUpload.single("photo"), (req, res) => {
  res.json({
    msg: "Upload berhasil",
  });
});

app.use((err, req, res, next) => {
  res.json({
    msg: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server Running and Up on http://${HOST}:${PORT}`);
});
