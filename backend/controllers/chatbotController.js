const { searchAnswer } = require("../utils/knowledgeBase")

const askQuestion = (req, res) => {
  const { question } = req.body
  if (!question) {
    return res.status(400).json({ answer: "Please ask a question!" })
  }
  const answer = searchAnswer(question)
  res.json({ answer })
}

module.exports = { askQuestion }
