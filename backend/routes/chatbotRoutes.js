const express = require("express")
const router = express.Router()
const { askQuestion } = require("../controllers/chatbotController")

router.post("/", askQuestion)

module.exports = router
