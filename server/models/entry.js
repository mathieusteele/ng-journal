
   
const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Entry", entrySchema);