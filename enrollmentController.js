const Enrollment = require("../models/Enrollment");

/* ==========================
   Enroll Student
========================== */

exports.enrollStudent = async (req, res) => {

    try {

        const exists = await Enrollment.findOne({

            student: req.user.id,

            course: req.body.course

        });

        if (exists) {

            return res.status(400).json({

                success: false,

                message: "Already enrolled."

            });

        }

        const enrollment =
            await Enrollment.create({

                student: req.user.id,

                course: req.body.course

            });

        res.status(201).json({

            success: true,

            message: "Enrollment successful.",

            data: enrollment

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================
   My Enrollments
========================== */

exports.myEnrollments = async (req, res) => {

    try {

        const enrollments =
            await Enrollment.find({

                student: req.user.id

            })

            .populate("course")

            .sort({

                createdAt: -1

            });

        res.json({

            success: true,

            total: enrollments.length,

            data: enrollments

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
