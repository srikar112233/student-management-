const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  grade: String,
  attendance: String,
});

module.exports = mongoose.model('Student', StudentSchema);