const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    acquiredSkill: String,
    companyName: String,
});
const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
