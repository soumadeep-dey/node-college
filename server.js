const express = require("express");
const app = express();
const db = require("./db");

require("dotenv").config();
PORT = process.env.PORT;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to College API");
});

//Routes
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

app.listen(PORT, () => {
  console.log(`🛜  Server running on port: ${PORT}...`);
});
