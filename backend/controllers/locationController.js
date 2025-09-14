const Location = require("../models/Location");

// Save location (upsert by deviceId)
exports.saveLocation = async (req, res) => {
  try {
    const { deviceId, lat, lng } = req.body;

    if (!deviceId || lat === undefined || lng === undefined) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const location = await Location.findOneAndUpdate(
      { deviceId },
      { lat, lng, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json(location);
  } catch (err) {
    console.error("Error saving location:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get latest location by deviceId
exports.getLocation = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const location = await Location.findOne({ deviceId }).sort({ updatedAt: -1 });
    res.json(location);
  } catch (err) {
    console.error("Error fetching location:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get location history
exports.getLocations = async (req, res) => {
  try {
    const { deviceId } = req.query;
    const filter = deviceId ? { deviceId } : {};
    const locations = await Location.find(filter).sort({ createdAt: -1 }).limit(50);
    res.json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ message: "Server error" });
  }
};
