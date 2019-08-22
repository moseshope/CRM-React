const express = require("express");
const mongoose = require("mongoose");
const dbConnection = require("./helpers/dbConnection");

const app = express();
require("dotenv").config();

// Database Connection
dbConnection();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});