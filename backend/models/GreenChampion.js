const mongoose = require("mongoose");

const greenChampionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
  status: { type: String, default: "pending" },
  points: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("GreenChampion", greenChampionSchema);
