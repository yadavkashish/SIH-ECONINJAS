const express = require("express");
const { createParticipant, getParticipants } = require("../controllers/participantController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Protect routes so only logged-in users can submit/get participants
router.post("/", protect, createParticipant);
router.get("/", protect, getParticipants);

module.exports = router;
