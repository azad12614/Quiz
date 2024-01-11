const mongoose = require("mongoose");
const date = new Date().toLocaleDateString();
const questionSchema = mongoose.Schema({
  question: String,
  answers: [String],
});

module.exports = questionSchema;
