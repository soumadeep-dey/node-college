const mongoose = require("mongoose");
require("dotenv").config();

//DB Connection
mongoose.connect(process.env.DB_URL);
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
