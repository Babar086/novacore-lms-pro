const Course = require("../models/Course");

/* ===================================
   Create Course
=================================== */

exports.createCourse = async (req, res) => {

    try {

        const {

            title,
            description,
            zoomMeetingLink,
            thumbnail,
            isPublished

        } = req.body;

        const course = await Course.create({

            title,
            description,

            instructor: req.user.id,

            zoomMeetingLink,

            thumbnail,

            isPublished

        });

        return res.status(201).json({

            success: true,

            message: "Course created successfully.",

            data: course

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ===================================
   Get All Courses
=================================== */

exports.getCourses = async (req, res) => {

    try {

        const courses = await Course.find()

            .populate("instructor", "fullName email")

            .sort({ createdAt: -1 });

        return res.status(200).json({

            success: true,

            total: courses.length,

            data: courses

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ===================================
   Get Single Course
=================================== */

exports.getCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id)

            .populate("instructor", "fullName email");

        if (!course) {

            return res.status(404).json({

                success: false,

                message: "Course not found."

            });

        }

        return res.status(200).json({

            success: true,

            data: course

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ===================================
   Update Course
=================================== */

exports.updateCourse = async (req, res) => {

    try {

        const course = await Course.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!course) {

            return res.status(404).json({

                success: false,

                message: "Course not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Course updated successfully.",

            data: course

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ===================================
   Delete Course
=================================== */

exports.deleteCourse = async (req, res) => {

    try {

        const course = await Course.findByIdAndDelete(

            req.params.id

        );

        if (!course) {

            return res.status(404).json({

                success: false,

                message: "Course not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Course deleted successfully."

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
