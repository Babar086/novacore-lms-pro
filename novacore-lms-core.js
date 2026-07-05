const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// ===================== MODELS (MINI) =====================

const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "student" }
}));

const Course = mongoose.model("Course", new mongoose.Schema({
  title: String,
  description: String,
  instructor: String
}));

const Enrollment = mongoose.model("Enrollment", new mongoose.Schema({
  studentId: mongoose.Types.ObjectId,
  courseId: mongoose.Types.ObjectId,
  progress: { type: Number, default: 0 },
  status: { type: String, default: "active" }
}));

// ===================== AUTH MIDDLEWARE =====================

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  // simplified decode (demo)
  req.user = { id: "demoUserId", role: "student" };
  next();
};

// ===================== MODULE 1: ENROLLMENT =====================

router.post("/enroll", protect, async (req, res) => {
  const { courseId } = req.body;

  const existing = await Enrollment.findOne({
    studentId: req.user.id,
    courseId
  });

  if (existing) return res.json({ msg: "Already enrolled" });

  const enroll = await Enrollment.create({
    studentId: req.user.id,
    courseId
  });

  res.json(enroll);
});

// ===================== MODULE 2: DASHBOARD =====================

router.get("/dashboard", protect, async (req, res) => {
  const enrollments = await Enrollment.find({ studentId: req.user.id });

  res.json({
    totalCourses: enrollments.length,
    activeCourses: enrollments.filter(e => e.status === "active").length,
    enrollments
  });
});

// ===================== MODULE 3: COURSE =====================

router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ===================== MODULE 4: PROGRESS UPDATE =====================

router.put("/progress/:id", protect, async (req, res) => {
  const { progress } = req.body;

  const updated = await Enrollment.findByIdAndUpdate(
    req.params.id,
    { progress },
    { new: true }
  );

  res.json(updated);
});

// ===================== MODULE 5: ADMIN SIMPLE CONTROL =====================

router.post("/course", protect, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Not allowed" });

  const course = await Course.create(req.body);
  res.json(course);
});

// ===================== EXPORT =====================

module.exports = router;
