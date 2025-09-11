const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload")
const { submitComplaint } = require("../controllers/complaintController")

router.post("/", upload.single("image"), submitComplaint)

module.exports = router
