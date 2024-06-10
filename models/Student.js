const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dept: {
    type: "String",
    enum: ["ca", "btech", "mtech"],
  },
  course: {
    type: String,
    enum: ["bca", "mca", "mechanical", "electrical", "computer science"],
  },
});

const StudentModel = mongoose.model("Student", studentSchema, "students");

module.exports = StudentModel;
