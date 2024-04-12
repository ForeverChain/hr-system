const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    country: { type: String, required: true },
    school: { type: String, required: true },
    educationDegrees: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    job: String,
    gpa: Number,
});

const EducationModel = mongoose.model("Education", educationSchema);

module.exports = EducationModel;
