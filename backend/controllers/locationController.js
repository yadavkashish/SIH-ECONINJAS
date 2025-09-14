const Location = require("../models/Location");

// Save location (if you also post via REST)
exports.saveLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "lat and lng required" });
    }

    const newLocation = await Location.create({ lat, lng });
    res.json(newLocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// Get last 50 points for drawing path
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(locations.reverse()); // send oldest → newest
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
