const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    interViewQuestionId: { type: mongoose.Schema.Types.ObjectId, ref: "Interview", required: true },
    talkingSkill: Number,
    appearance: Number,
    advantage: Number,
    disadvantage: Number,
    skills: Number,
    rate: Number,
});

const ResultModel = mongoose.model("Result", resultSchema);

module.exports = ResultModel;
