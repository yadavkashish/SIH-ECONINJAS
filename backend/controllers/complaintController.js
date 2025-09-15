const transporter = require("../config/mailer");
const reverseGeocode = require("../utils/reverseGeocode");
const Complaint = require("../models/Complaint");

const submitComplaint = async (req, res) => {
  try {
    console.log("Req.body:", req.body);
    console.log("Req.file:", req.file);
    console.log("Req.user:", req.user);

    const { description, latitude, longitude } = req.body;
    const latitudeNum = latitude ? parseFloat(latitude) : null;
    const longitudeNum = longitude ? parseFloat(longitude) : null;

    if (!description) return res.status(400).json({ error: "Description is required" });

    let locationText = "Location not provided";
    if (latitudeNum && longitudeNum) {
      try {
        locationText = await reverseGeocode(latitudeNum, longitudeNum);
      } catch (geoErr) {
        console.error("Reverse geocoding failed:", geoErr.message);
        locationText = `Coordinates provided (${latitudeNum}, ${longitudeNum}), but address lookup failed.`;
      }
    }

    // ✅ Cloudinary image URL
    const imageUrl = req.file ? req.file.path : null;

    const complaint = await Complaint.create({
      description,
      latitude: latitudeNum,
      longitude: longitudeNum,
      location: locationText,
      attachments: imageUrl ? [imageUrl] : [],
      submittedBy: req.user?._id,
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.AUTHORITY_EMAIL,
      subject: "New Complaint Submitted",
      html: `
        <h2>New Complaint</h2>
        <p><b>Description:</b> ${description}</p>
        <p><b>Location:</b> ${locationText}</p>
        <p><b>Coordinates:</b> ${latitudeNum || "N/A"}, ${longitudeNum || "N/A"}</p>
        ${imageUrl ? `<p><b>Image:</b><br><img src="${imageUrl}" width="400"/></p>` : ""}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "✅ Complaint submitted successfully", complaint });
  } catch (err) {
    console.error("Complaint submission error:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};

module.exports = { submitComplaint };
