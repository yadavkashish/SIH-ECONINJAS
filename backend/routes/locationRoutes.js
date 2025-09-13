const express = require("express");
const Location = require("../models/Location");

const router = express.Router();

// Get latest location
router.get("/latest", async (req, res) => {
  try {
    const latest = await Location.findOne().sort({ createdAt: -1 });
    res.json(latest || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get history
router.get("/history", async (req, res) => {
  try {
    const history = await Location.find().sort({ createdAt: -1 }).limit(50);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;