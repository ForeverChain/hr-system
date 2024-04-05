const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Admin" },
    userName: { type: String, required: true },
    password: { type: String, required: true },
});

const AdminModel = mongoose.model("Admin", adminSchema);

module.exports = AdminModel;
