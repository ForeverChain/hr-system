const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    candidate_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

const CandidateModel = mongoose.model("Candidate", candidateSchema);

module.exports = CandidateModel;
