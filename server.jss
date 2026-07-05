require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

/* ==========================
   Routes
========================== */

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const courseRoutes = require("./routes/courseRoutes");

/* ==========================
   Middleware
========================== */

const errorHandler = require("./middleware/errorHandler");

const app = express();

/* ==========================
   Database
========================== */

connectDB();

/* ==========================
   Global Middleware
========================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

/* ==========================
   Home Route
========================== */

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "NovaCore LMS Pro Backend Running Successfully"

    });

});

/* ==========================
   API Routes
========================== */

app.use("/api/auth", authRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/courses", courseRoutes);

/* ==========================
   404 Route
========================== */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

/* ==========================
   Global Error Handler
========================== */

app.use(errorHandler);

/* ==========================
   Server
========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server Running On Port ${PORT}`);

});
