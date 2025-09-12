const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
  city: { type: String, required: true },
  wardNumber: { type: Number, required: true },
  name: { type: String, required: true },
  pincodes: [String],
  localities: [String],
});

module.exports = mongoose.model("Ward", wardSchema);
