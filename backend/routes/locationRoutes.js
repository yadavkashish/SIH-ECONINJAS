const express = require("express")
const router = express.Router()
const { saveLocation, getLocations } = require("../controllers/locationController")

router.post("/", saveLocation)
router.get("/", getLocations)

module.exports = router
