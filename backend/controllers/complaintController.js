const transporter = require("../config/mailer")
const reverseGeocode = require("../utils/reverseGeocode")

const submitComplaint = async (req, res) => {
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
    res.status(500).json({ error: "Something went wrong", details: err.message })
  }
}

module.exports = { submitComplaint }
