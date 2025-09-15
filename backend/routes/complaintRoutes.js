const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { submitComplaint } = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, submitComplaint);

module.exports = router;
