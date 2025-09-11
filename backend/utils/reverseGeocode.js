const axios = require("axios")

async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Complaint-App" },
    })
    return data.display_name || "Unknown Location"
  } catch {
    return "Unknown Location"
  }
}

module.exports = reverseGeocode
