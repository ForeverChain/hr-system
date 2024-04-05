const mongoose = require("mongoose");
const { Schema } = mongoose;

const HrOfficerSchema = new Schema({
    hrId: String,
    userName: { type: String, unique: true },
    password: String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

const HrOfficerModel = mongoose.model("HR", HrOfficerSchema);

module.exports = HrOfficerModel;
