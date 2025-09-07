import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import nodemailer from "nodemailer";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "complaints",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Reverse geocode function
async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Complaint-App" },
    });
    return data.display_name || "Unknown Location";
  } catch (err) {
    console.error("Reverse geocode error:", err);
    return "Unknown Location";
  }
}

// Complaint route
app.post("/api/complaints", upload.single("image"), async (req, res) => {
  try {
    const { description, latitude, longitude } = req.body;

    let locationText = "Location not provided";
    if (latitude && longitude) {
      locationText = await reverseGeocode(latitude, longitude);
    }

    const imageUrl = req.file?.path;

    // Send email
   const mailOptions = {
  from: process.env.GMAIL_USER, // sender (your team Gmail)
  to: process.env.AUTHORITY_EMAIL, // receiver (authority Gmail)
  subject: "New Complaint Submitted",
  html: `
    <h2>New Complaint</h2>
    <p><b>Description:</b> ${description}</p>
    <p><b>Location:</b> ${locationText}</p>
    <p><b>Coordinates:</b> ${latitude}, ${longitude}</p>
    ${imageUrl ? `<p><b>Image:</b><br><img src="${imageUrl}" width="400"/></p>` : ""}
  `,
};


    await transporter.sendMail(mailOptions);

    res.json({
      message: "Complaint submitted successfully",
      imageUrl,
      location: locationText,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
