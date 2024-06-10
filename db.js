const mongoose = require("mongoose");
require("dotenv").config();

// DB_URL_LOCAL=process.env.DB_URL_LOCAL
DB_URL = process.env.DB_URL;

//DB Connection
mongoose.connect(DB_URL);
const db = mongoose.connection;

//Listeners
db.on("connected", () => {
  console.log("✅ Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("⛔️ MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("❌ Disconnected to MongoDB Server");
});

module.exports = db;
