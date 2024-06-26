const mongoose = require("mongoose");
const { Schema } = mongoose;

const HrOfficerSchema = new Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    userType: { type: String, default: "2" },
});

const HrOfficerModel = mongoose.model("HR", HrOfficerSchema);

module.exports = HrOfficerModel;
