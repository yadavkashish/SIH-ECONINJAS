const Participant = require("../models/Participant");

// @desc Create new participant linked to logged-in user
exports.createParticipant = async (req, res) => {
  try {
    const participant = new Participant({
      ...req.body,
      userId: req.user._id // attach logged-in user ID
    });
    const savedParticipant = await participant.save();
    res.status(201).json(savedParticipant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Get all participants with user info
exports.getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate("userId", "name email");
    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
