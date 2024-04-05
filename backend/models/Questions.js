const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    candidateId: String,
    date: Date,
    resultId: { type: [String], default: [] },
    hrOfficerId: String,
});

const QuestionModel = mongoose.model("question", questionSchema);

module.exports = QuestionModel;
