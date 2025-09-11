const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["Normal User", "Municipal Worker", "Industrialist"], 
    required: true 
  },
  ngoMember: { type: Boolean, default: false },

  // Link participant form to the logged-in user
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Participant", participantSchema);
