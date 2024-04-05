const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    scoreObtained: Date,
});

const InterViewModel = mongoose.model("interView", interviewSchema);

module.exports = InterViewModel;
