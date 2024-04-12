const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    foreignLanguages: [{ type: mongoose.Schema.Types.ObjectId, ref: "ForeignLanguage" }],
    workExperiences: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkExperience" }],
});

const CandidateModel = mongoose.model("Candidate", candidateSchema);

module.exports = CandidateModel;
