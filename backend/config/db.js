const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
};

mongoose.connect(config.MONGO_URI);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connected!!!");
});

module.exports = config;
