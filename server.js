require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

const app = express();

/* ==========================
   Database
========================== */

connectDB();

/* ==========================
   Middleware
========================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

/* ==========================
   Test Route
========================== */

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "NovaCore LMS Pro Backend Running Successfully"

    });

});

/* ==========================
   API Routes
   (Will Be Added Next)
========================== */

// app.use("/api/auth", authRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/teachers", teacherRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api/contact", contactRoutes);

/* ==========================
   404 Handler
========================== */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

/* ==========================
   Server
========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});
