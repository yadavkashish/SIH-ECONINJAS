const express = require("express");
const router = express.Router();
const {
  saveLocation,
  getLocation,
  getLocations,
} = require("../controllers/locationController");

// POST /api/locations → save location
router.post("/", saveLocation);

// GET /api/locations?deviceId=ESP32-01 → history
router.get("/", getLocations);

// GET /api/locations/:deviceId → latest location
router.get("/:deviceId", getLocation);

module.exports = router;
