const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const authorize = require("../middleware/authorize");

const {

    enrollStudent,

    myEnrollments

} = require("../controllers/enrollmentController");

/* Student Enrollment */

router.post(

    "/",

    auth,

    authorize("student"),

    enrollStudent

);

/* Student Courses */

router.get(

    "/my-courses",

    auth,

    authorize("student"),

    myEnrollments

);

module.exports = router;
