const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    quitJobReason: String,
});

const WorkExperieceModel = mongoose.model("WorkExperience", workExperienceSchema);

module.exports = WorkExperieceModel;
