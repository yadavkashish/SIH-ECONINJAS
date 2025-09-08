import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "cloudinary"
import nodemailer from "nodemailer"
import axios from "axios"
import mongoose from "mongoose"
import fs from "fs"
import path from "path"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ===================== Cloudinary =====================
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "complaints",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
})
const upload = multer({ storage })

// ===================== Nodemailer =====================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

// ===================== Reverse Geocode =====================
async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Complaint-App" },
    })
    return data.display_name || "Unknown Location"
  } catch (err) {
    console.error("Reverse geocode error:", err.message)
    return "Unknown Location"
  }
}

// ===================== Complaint Route =====================
app.post("/api/complaints", upload.single("image"), async (req, res) => {
  try {
    const { description, latitude, longitude } = req.body

    let locationText = "Location not provided"
    if (latitude && longitude) {
      locationText = await reverseGeocode(latitude, longitude)
    }

    const imageUrl = req.file?.path

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.AUTHORITY_EMAIL,
      subject: "New Complaint Submitted",
      html: `
        <h2>New Complaint</h2>
        <p><b>Description:</b> ${description}</p>
        <p><b>Location:</b> ${locationText}</p>
        <p><b>Coordinates:</b> ${latitude || "N/A"}, ${longitude || "N/A"}</p>
        ${imageUrl ? `<p><b>Image:</b><br><img src="${imageUrl}" width="400"/></p>` : ""}
      `,
    }

    await transporter.sendMail(mailOptions)

    res.json({
      message: "✅ Complaint submitted successfully",
      imageUrl,
      location: locationText,
    })
  } catch (err) {
    console.error("Complaint Error:", err.message)
    res.status(500).json({ error: "Something went wrong", details: err.message })
  }
})

// ===================== Location Schema =====================
const locationSchema = new mongoose.Schema({
  deviceId: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
})
const Location = mongoose.model("Location", locationSchema)

// ===================== Location Routes =====================
app.post("/api/location", async (req, res) => {
  try {
    const { deviceId, latitude, longitude } = req.body

    await Location.findOneAndUpdate(
      { deviceId },
      { latitude, longitude, timestamp: new Date() },
      { upsert: true }
    )

    res.json({ success: true })
  } catch (err) {
    console.error("Location Save Error:", err.message)
    res.status(500).json({ error: "Failed to save location" })
  }
})

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await Location.find({})
    res.json(locations)
  } catch (err) {
    console.error("Fetch Locations Error:", err.message)
    res.status(500).json({ error: "Failed to fetch locations" })
  }
})

// ===================== Knowledge Base Chatbot =====================
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

app.post("/ask", (req, res) => {
  const { question } = req.body
  if (!question) {
    return res.status(400).json({ answer: "Please ask a question!" })
  }

  const answer = searchAnswer(question)
  res.json({ answer })
})

// ===================== MongoDB Connection =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message))

// ===================== Server =====================
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
