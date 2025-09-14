const Location = require("../models/Location");

// Save location (latest coordinates)
exports.saveLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Upsert: keep only one record for latest vehicle location
    const location = await Location.findOneAndUpdate(
      {}, // no deviceId
      { lat, lng, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json(location);
  } catch (err) {
    console.error("Error saving location:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get latest location
exports.getLocation = async (req, res) => {
  try {
    const location = await Location.findOne().sort({ updatedAt: -1 });
    res.json(location);
  } catch (err) {
    console.error("Error fetching location:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get location history
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 }).limit(50);
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ message: "Server error" });
  }
};
