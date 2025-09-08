import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import nodemailer from "nodemailer";
import axios from "axios";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== Cloudinary =====================
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "complaints",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// ===================== Nodemailer =====================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Gmail App Password
  },
});

// ===================== Reverse Geocode =====================
async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Complaint-App" },
    });
    return data.display_name || "Unknown Location";
  } catch (err) {
    console.error("Reverse geocode error:", err.message);
    return "Unknown Location";
  }
}

// ===================== Complaint Route =====================
app.post("/api/complaints", upload.single("image"), async (req, res) => {
  try {
    const { description, latitude, longitude } = req.body;

    let locationText = "Location not provided";
    if (latitude && longitude) {
      locationText = await reverseGeocode(latitude, longitude);
    }

    const imageUrl = req.file?.path;

    // Prepare email
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
    };

    await transporter.sendMail(mailOptions);

    res.json({
      message: "✅ Complaint submitted successfully",
      imageUrl,
      location: locationText,
    });
  } catch (err) {
    console.error("Complaint Error:", err.message);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

// ===================== Location Schema =====================
const locationSchema = new mongoose.Schema({
  deviceId: String,
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});
const Location = mongoose.model("Location", locationSchema);

// ===================== Location Routes =====================
app.post("/api/location", async (req, res) => {
  try {
    const { deviceId, latitude, longitude } = req.body;

    await Location.findOneAndUpdate(
      { deviceId },
      { latitude, longitude, timestamp: new Date() },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Location Save Error:", err.message);
    res.status(500).json({ error: "Failed to save location" });
  }
});

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (err) {
    console.error("Fetch Locations Error:", err.message);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

// ===================== MongoDB Connection =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ===================== Server =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
