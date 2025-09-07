const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// -------------------------
// Topic keywords define karo yaha
const topicKeywords = {
  background: ["background", "waste", "pollution", "issue"],
  citizen_training: ["segregation", "dustbin", "compost", "citizen"],
  incentives_penalties: ["penalty", "fine", "reward", "incentive"],
  green_champions: ["green", "champion", "committee", "monitoring"],
  facilities: ["plant", "recycle", "facility", "scrap"],
  digital_app: ["app", "digital", "track", "geo-tag"],
  community_participation: ["community", "cleaning", "participation"],
  waste_worker_training: ["worker", "training", "safety", "gear"],
};
// -------------------------

// Function: Load KB
function loadKnowledgeBase() {
  const kbPath = path.join(__dirname, "../kb");
  const files = fs.readdirSync(kbPath);
  let knowledge = {};

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(kbPath, file), "utf-8");
    knowledge[file.replace(".md", "")] = content;
  });

  return knowledge;
}

const knowledgeBase = loadKnowledgeBase();

// -------------------------
// Updated searchAnswer function yaha use karo
const topicPriority = [
    "citizen_training",
    "incentives_penalties",
    "green_champions",
    "facilities",
    "digital_app",
    "community_participation",
    "waste_worker_training",
    "background"
  ];
  
  function searchAnswer(question) {
    const lowerQ = question.toLowerCase().split(" ");
    let bestTopic = null;
    let maxMatches = 0;
  
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      let count = keywords.filter(k => lowerQ.includes(k)).length;
      if (count > maxMatches) {
        maxMatches = count;
        bestTopic = topic;
      } else if (count === maxMatches && maxMatches > 0) {
        // tie breaker using predefined priority
        if (topicPriority.indexOf(topic) < topicPriority.indexOf(bestTopic)) {
          bestTopic = topic;
        }
      }
    }
  
    if (bestTopic) {
      return `📘 From ${bestTopic}:\n\n${knowledgeBase[bestTopic]}`;
    }
  
    return "😕 Sorry, mujhe iska jawab nahi mila KB me.";
  }
  
// -------------------------

// API endpoint
app.post("/ask", (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ answer: "Please ask a question!" });
  }

  const answer = searchAnswer(question);
  res.json({ answer });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
