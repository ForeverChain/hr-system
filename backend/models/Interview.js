const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    date: { type: Date, default: Date.now },
    resultId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
    hr: { type: mongoose.Schema.Types.ObjectId, ref: "HR", required: true },
});

const InterViewModel = mongoose.model("interView", interviewSchema);

module.exports = InterViewModel;
