const transporter = require("../config/mailer");
const reverseGeocode = require("../utils/reverseGeocode");
const Complaint = require("../models/Complaint");

const submitComplaint = async (req, res) => {
  try {
    const { description, latitude, longitude } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    let locationText = "Location not provided";
    try {
      if (latitude && longitude) {
        locationText = await reverseGeocode(latitude, longitude);
      }
    } catch (geoErr) {
      console.error("Reverse geocoding failed:", geoErr.message);
      locationText = `Coordinates provided (${latitude}, ${longitude}), but address lookup failed.`;
    }

    const imageUrl = req.file ? req.file.path : null;

    // Save to DB
    const complaint = await Complaint.create({
      description,
      latitude,
      longitude,
      location: locationText,
      imageUrl,
      submittedBy: req.user?._id,
    });

    // Send email
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
      complaint,
    });
  } catch (err) {
    console.error("Complaint submission error:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};

module.exports = { submitComplaint };

