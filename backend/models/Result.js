const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    talkingSkill: Number,
    appearance: Number,
    advantage: Number,
    disadvantage: Number,
    skills: Number,
    rate: Number,
});

const ResultModel = mongoose.model("Result", resultSchema);

module.exports = ResultModel;
