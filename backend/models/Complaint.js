// models/Complaint.js
const mongoose = require("mongoose")

const ComplaintSchema = new mongoose.Schema({
  description: { type: String, required: true },
  attachments: [String], // for image(s)
  status: { type: String, enum: ["open","in-progress","resolved"], default: "open" },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  latitude: Number,
  longitude: Number,
  location: String,
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attachments: [String], // for images
});


module.exports = mongoose.model("Complaint", ComplaintSchema);
