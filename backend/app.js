const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://mongo:27017/studentdb");

// Student schema
const Student = mongoose.model("Student", {
  studentId: String,
  name: String,
  age: Number,
  class: String
});

// Save student
app.post("/students", async (req, res) => {
  await new Student(req.body).save();
  res.json({ message: "Student saved successfully" });
});

// Get students
app.get("/students", async (req, res) => {
  res.json(await Student.find());
});

app.listen(3000, () => console.log("Backend running on port 3000"));
