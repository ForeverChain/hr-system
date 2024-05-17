const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, default: "1" },
});

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = AdminModel;
