const Location = require("../models/Location")

const saveLocation = async (req, res) => {
  try {
    const { deviceId, latitude, longitude } = req.body
    await Location.findOneAndUpdate(
      { deviceId },
      { latitude, longitude, timestamp: new Date() },
      { upsert: true }
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to save location" })
  }
}

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({})
    res.json(locations)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch locations" })
  }
}

module.exports = { saveLocation, getLocations }
