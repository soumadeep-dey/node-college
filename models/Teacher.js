const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
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
  email: {
    type: String,
    unique: true,
  },
  dept: {
    type: "String",
    enum: ["ca", "btech", "mtech"],
  },
  skills: {
    type: ["Strings"],
    default: [],
  },
});

const TeacherModel = mongoose.model("Teacher", teacherSchema, "teachers");

module.exports = TeacherModel;
