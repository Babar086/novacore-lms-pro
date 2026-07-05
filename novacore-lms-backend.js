const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// ================= DB CONNECT =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= MODELS =================
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

// ================= AUTH MIDDLEWARE =================
const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// ================= AUTH =================
app.post("/api/auth/login", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ user, token });
});

// ================= COURSES =================
app.post("/api/course", protect, async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
});

app.get("/api/course", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ================= ENROLLMENT =================
app.post("/api/enroll", protect, async (req, res) => {
  const { courseId } = req.body;

  const exists = await Enrollment.findOne({
    studentId: req.user.id,
    courseId
  });

  if (exists) return res.json({ msg: "Already enrolled" });

  const enroll = await Enrollment.create({
    studentId: req.user.id,
    courseId
  });

  res.json(enroll);
});

// ================= STUDENT DASHBOARD =================
app.get("/api/student/dashboard", protect, async (req, res) => {
  const enrollments = await Enrollment.find({ studentId: req.user.id });

  let total = enrollments.length;
  let active = enrollments.filter(e => e.status === "active").length;

  let progressSum = 0;
  enrollments.forEach(e => progressSum += e.progress);

  res.json({
    totalCourses: total,
    activeCourses: active,
    avgProgress: total ? (progressSum / total).toFixed(1) : 0,
    enrollments
  });
});

// ================= PROGRESS UPDATE =================
app.put("/api/progress/:id", protect, async (req, res) => {
  const updated = await Enrollment.findByIdAndUpdate(
    req.params.id,
    { progress: req.body.progress },
    { new: true }
  );

  res.json(updated);
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
