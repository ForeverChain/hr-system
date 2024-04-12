const mongoose = require("mongoose");

const foreignLanguageSchema = new mongoose.Schema({
    languageName: { type: String, required: true },
    reading: String,
    listening: String,
    writing: String,
    speaking: String,
});

const ForeignLanguageModel = mongoose.model("ForeignLanguage", foreignLanguageSchema);

module.exports = ForeignLanguageModel;
