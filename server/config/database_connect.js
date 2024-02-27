const mongoose = require("mongoose");
require("dotenv").config();

function databaseConnect() {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((error) => {
      console.error("Error connecting to database:", error.message);
    });
}

module.exports = databaseConnect;
