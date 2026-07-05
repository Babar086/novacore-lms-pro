const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* ==========================
   Register
========================== */

exports.register = async (req, res) => {

    try {

        const {
            fullName,
            email,
            password,
            role
        } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {

            return res.status(400).json({

                success: false,

                message: "Email already exists."

            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({

            fullName,

            email,

            password: hashedPassword,

            role

        });

        res.status(201).json({

            success: true,

            message: "Registration successful.",

            user: {

                id: user._id,

                fullName: user.fullName,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/* ==========================
   Login
========================== */

exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid credentials."

            });

        }

        const matched =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!matched) {

            return res.status(401).json({

                success: false,

                message: "Invalid credentials."

            });

        }

        const token = jwt.sign(

            {

                id: user._id,

                role: user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.json({

            success: true,

            token,

            user: {

                id: user._id,

                fullName: user.fullName,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
