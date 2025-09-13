// models/Task.js
const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  community: { type: mongoose.Schema.Types.ObjectId, ref: "Community", required: true },
  title: { type: String, required: true },
  description: String,
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // optional assignments
  status: { type: String, enum: ["pending","in-progress","completed"], default: "pending" },
  points: { type: Number, default: 0 },
  deadline: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", TaskSchema);
