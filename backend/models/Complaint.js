// models/Complaint.js
const mongoose = require("mongoose")

const ComplaintSchema = new mongoose.Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  attachments: [String],
  status: { type: String, enum: ["open","in-progress","resolved"], default: "open" },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
