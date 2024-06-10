const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// DB model import
const Teacher = require("../models/Teacher");

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const allteachers = await Teacher.find();

    console.log("✅ All teachers fetched");
    res.status(200).send(allteachers);
  } catch (err) {
    console.log("⚠️Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Get all teachers by dept
router.get("/dept/:deptType", async (req, res) => {
  try {
    const deptType = req.params.deptType;

    if (deptType === "ca" || deptType === "btech" || deptType === "mtech") {
      const teahcerData = await Teacher.find({ dept: deptType });

      console.log("✅ All teachers by dept fetched");
      res.status(200).send(teahcerData);
    } else {
      console.log("❓️ Invalid dept type");
      return res.status(400).send({ error: "Invalid dept type" });
    }
  } catch (err) {
    console.log("⛔️", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { dob, ...otherData } = req.body;
    const parsedDOB = new Date(dob);

    const newTeacher = new Teacher({
      ...otherData,
      dob: parsedDOB,
    });
    const savedTeacher = await newTeacher.save();

    console.log("✅ New Teacher data saved");
    res.status(200).send(savedTeacher);
  } catch (err) {
    console.log("⛔️", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      console.log("❓️ Invalid Teacher ID");
      return res.status(400).send({ error: "Invalid Teacher ID" });
    }

    if ("dob" in updateData) {
      updateData.dob = new Date(updateData.dob);
    }
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updateData
    );

    if (!updatedTeacher) {
      console.log("❓️ Teacher not found");
      return res.status(404).send({ error: "Teacher not found" });
    }

    console.log("✅ Teacher data updated");
    res.status(200).send(updatedTeacher);
  } catch (err) {
    console.log("⛔️", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      console.log("❓️ Invalid teacher ID");
      return res.status(400).send({ error: "Invalid teacher ID" });
    }

    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      console.log("❓️ Teacher not found");
      return res.status(404).send({ error: "Teacher not found" });
    }
    console.log("✅ Teacher data deleted");
    res.status(200).send(deletedTeacher);
  } catch (err) {
    console.log("⛔️", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// export router
module.exports = router;
