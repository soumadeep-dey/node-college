const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// DB model import
const Student = require("../models/Student");

// Get all students
router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find();
    console.log("✅ All student data fetched.");
    res.status(200).send(allStudents);
  } catch (err) {
    console.log(err);
    res.status(500).send("⛔️ Internal Server Error");
  }
});

// Get all students by dept
router.get("/dept/:dept", async (req, res) => {
  try {
    const studentDept = req.params.dept;

    if (
      studentDept === "ca" ||
      studentDept === "btech" ||
      studentDept === "mtech"
    ) {
      const studentData = await Student.find({ dept: studentDept });
      console.log("✅ Student data by dept fetched");
      res.status(200).send(studentData);
    } else {
      console.log("❓️ Invalid dept type");
      return res.status(400).send({ error: "Invalid dept type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("⛔️ Internal Server Error");
  }
});

// Get all students by course
router.get("/course/:course", async (req, res) => {
  try {
    const studentCourse = req.params.course;

    if (
      studentCourse === "bca" ||
      studentCourse === "mca" ||
      studentCourse === "mechanical" ||
      studentCourse === "electrical" ||
      studentCourse === "computer science"
    ) {
      const studentData = await Student.find({ course: studentCourse });
      console.log("✅ Student data by course fetched");
      res.status(200).send(studentData);
    } else {
      console.log("❓️ Invalid course type");
      return res.status(400).send({ error: "Invalid course type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("⛔️ Internal Server Error");
  }
});

// Post new student
router.post("/", async (req, res) => {
  try {
    const { dob, ...otherData } = req.body;
    parsedDOB = new Date(dob);

    const newStudent = new Student({
      ...otherData,
      dob: parsedDOB,
    });

    const savedStudent = await newStudent.save();

    console.log("✅ Student data saved");
    res.status(200).send(savedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).send("⛔️ Internal Server Error");
  }
});

// Update student
router.put("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      console.log("❓️ Invalid student ID:", studentId);
      return res.status(400).send({ error: "Invalid student ID" });
    }

    if ("dob" in updateData) {
      updateData.dob = new Date(updateData.dob);
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData
    );

    if (!updatedStudent) {
      console.log("❓️ Student not found");
      return res.status(404).send({ error: "Student not found" });
    }

    console.log("✅ Student data updated");
    res.status(200).send(updatedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).send("⛔️ Internal Server Error");
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    //Check for Valid Id
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      console.log(`❓️ Invalid student ID: ${studentId}`);
      return res.status(400).send({ error: "Invalid student ID" });
    }

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      console.log("❓️ Student not found");
      return res.status(404).send({ error: "Student not found" });
    }

    console.log("✅ Student data deleted");
    res.status(200).send(deletedStudent);
  } catch (err) {
    console.log(err);
    res.status(500).send("⛔️ Internal Server Error");
  }
});

module.exports = router;
