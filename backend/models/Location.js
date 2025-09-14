const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
