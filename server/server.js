// Packages
const expressValidator = require("express-validator");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Import methods
const { runEveryMidnight, dbConnection, errorHandler } = require("./helpers");
const logger = require("./helpers/logger");

// Database Connection
dbConnection();

// Middlewares
logger(app);
app.use(cors());
app.use(express.json());
app.use(expressValidator());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.redirect("/api/users");
});

app.use("/api/bus", require("./routes/bus"));
app.use("/api/users", require("./routes/user"));
app.use("/api/guests", require("./routes/guest"));
app.use("/api/owners", require("./routes/owner"));
app.use("/api/bookings", require("./routes/booking"));
app.use("/api/locations", require("./routes/location"));
app.use("/api/auth-user", require("./routes/auth-user"));
app.use("/api/auth-owner", require("./routes/auth-owner"));

// Error handling middleware
app.use(function(err, req, res, next) {
  return res.status(500).json({
    error: errorHandler(err) || "Something went wrong!"
  });
});

// Run every-midnight to check if bus deporting date is passed
runEveryMidnight();

const port = process.env.PORT || 8525;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
