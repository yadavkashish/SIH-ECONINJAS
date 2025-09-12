const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  gender: String,
  mobile: String,
  email: String,
  address: {
    house: String,
    locality: String,
    selectedWard: Number,
    city: String,
    pin: String,
  },
  ngoName: String,
  occupation: String,
  status: { type: String, default: "pending" }, // pending, approved, rejected
  points: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
