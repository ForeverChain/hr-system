const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Interview" },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate" },
    date: { type: Date, default: Date.now },
    resultId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
    hrOfficerId: { type: mongoose.Schema.Types.ObjectId, ref: "HR" },
});

const InterViewModel = mongoose.model("interView", interviewSchema);

module.exports = InterViewModel;
