// models/Community.js
const mongoose = require("mongoose")

const CommunitySchema = new mongoose.Schema({
  city: { type: String, required: true },
  wardNumber: { type: Number, required: true },
  name: { type: String, required: true },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, default: "champion" }, // champion or leader
      joinedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Community", CommunitySchema);
