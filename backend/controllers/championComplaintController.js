// controllers/complaintController.js
const Complaint = require("../models/Complaint");

/**
 * Create a complaint
 */
exports.createComplaint = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { description, attachments } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description required" });
    }

    const complaint = await Complaint.create({
      community: communityId,
      raisedBy: req.user?._id,
      description,
      attachments: attachments || [],
    });

    res.json({ complaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update complaint status
 */
exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolvedBy } = req.body;

    const update = { status };
    if (status === "resolved") {
      update.resolvedBy = resolvedBy || req.user._id;
    }
    update.updatedAt = new Date();

    const complaint = await Complaint.findByIdAndUpdate(id, update, { new: true });

    res.json({ complaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
