const express = require("express");
const {
  createParticipant,
  getParticipants,
  getMyParticipant
} = require("../controllers/participantController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new participant
router.post("/", protect, createParticipant);

// Get logged-in user's participant
router.get("/me", protect, getMyParticipant);

// Get all participants (admin use case, optional)
router.get("/", protect, getParticipants);

module.exports = router;
