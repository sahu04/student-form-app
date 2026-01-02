const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://mongo:27017/studentdb");

const Student = mongoose.model("Student", {
  studentId: String,
  name: String,
  age: Number,
  class: String
});

app.post("/students", async (req, res) => {
  await new Student(req.body).save();
  res.json({ message: "Student saved" });
});

app.get("/students", async (req, res) => {
  res.json(await Student.find());
});

app.listen(3000, () => console.log("Backend running"));
