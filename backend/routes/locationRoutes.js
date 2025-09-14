const express = require("express");
const router = express.Router();
const { saveLocation, getLocation, getLocations } = require("../controllers/locationController");

// POST /api/locations → save latest location
router.post("/", saveLocation);

// GET /api/locations → get history
router.get("/", getLocations);

// GET /api/locations/latest → get latest location
router.get("/latest", getLocation);

module.exports = router;
