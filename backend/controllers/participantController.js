const Participant = require("../models/Participant");

// @desc Create new participant linked to logged-in user
exports.createParticipant = async (req, res) => {
  try {
    const { name, city, pincode, mobileNumber, role, ngoMember } = req.body;

    // Validate required fields
    if (!name || !city || !pincode || !mobileNumber || !role) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const participant = await Participant.create({
      name,
      city,
      pincode,
      mobileNumber,
      role,
      ngoMember: ngoMember || false,
      userId: req.user._id, // logged-in user
    });

    res.status(201).json({participant});
    console.log(participant)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get participant for logged-in user
// controllers/participantController.js
exports.getMyParticipant = async (req, res) => {
  try {
    const participant = await Participant.findOne({ userId: req.user._id })
      .populate("userId", "name email"); // <-- populates user info

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.json({ participant }); // wrap in object ✅
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// @desc Get all participants with user info
exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find()
      .populate("userId", "name email");

    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
