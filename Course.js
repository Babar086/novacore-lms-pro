const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    zoomMeetingLink: {
        type: String,
        default: ""
    },

    thumbnail: {
        type: String,
        default: ""
    },

    isPublished: {
        type: Boolean,
        default: false
    }

}, {

    timestamps: true

});

module.exports = mongoose.model(
    "Course",
    courseSchema
);
