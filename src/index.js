const express = require("express");
require("dotenv").config();

const PORT = process.env.DB_PORT || 4000;
const HOST = process.env.DB_HOST || "localhost";

const userRoutes = require("./routes/users");
const middlewareLogRequest = require("./middleware/logs");
const middlewareUpload = require("./middleware/multer");

const app = express();

app.use(middlewareLogRequest);

app.use(express.json());
app.use(express.static("public/images"));

app.use("/users", userRoutes);
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
