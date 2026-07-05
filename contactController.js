const Contact = require("../models/Contact");

exports.sendMessage = async (req, res) => {

    try {

        const contact = await Contact.create(req.body);

        res.status(201).json({

            success: true,

            message: "Message sent successfully.",

            contact

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
