const fs = require("fs")
const path = require("path")

const topicKeywords = {
  background: ["background", "waste", "pollution", "issue"],
  citizen_training: ["segregation", "dustbin", "compost", "citizen"],
  incentives_penalties: ["penalty", "fine", "reward", "incentive"],
  green_champions: ["green", "champion", "committee", "monitoring"],
  facilities: ["plant", "recycle", "facility", "scrap"],
  digital_app: ["app", "digital", "track", "geo-tag"],
  community_participation: ["community", "cleaning", "participation"],
  waste_worker_training: ["worker", "training", "safety", "gear"],
}

const topicPriority = [
  "citizen_training",
  "incentives_penalties",
  "green_champions",
  "facilities",
  "digital_app",
  "community_participation",
  "waste_worker_training",
  "background",
]

function loadKnowledgeBase() {
  const kbPath = path.join(process.cwd(), "kb")
  const files = fs.readdirSync(kbPath)
  let knowledge = {}

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(kbPath, file), "utf-8")
    knowledge[file.replace(".md", "")] = content
  })

  return knowledge
}

const knowledgeBase = loadKnowledgeBase()

function searchAnswer(question) {
  const lowerQ = question.toLowerCase().split(" ")
  let bestTopic = null
  let maxMatches = 0

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    let count = keywords.filter((k) => lowerQ.includes(k)).length
    if (count > maxMatches) {
      maxMatches = count
      bestTopic = topic
    } else if (count === maxMatches && maxMatches > 0) {
      if (topicPriority.indexOf(topic) < topicPriority.indexOf(bestTopic)) {
        bestTopic = topic
      }
    }
  }

  if (bestTopic) {
    return `📘 From ${bestTopic}:\n\n${knowledgeBase[bestTopic]}`
  }

  return "😕 Sorry, mujhe iska jawab nahi mila KB me."
}

module.exports = { searchAnswer }
