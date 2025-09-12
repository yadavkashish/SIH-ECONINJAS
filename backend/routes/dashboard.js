const express = require("express");
const Ward = require("../models/Ward");
const Application = require("../models/Application");

const router = express.Router();
const ADMIN_HEADER = "x-admin-token";

// City Summary
router.get("/summary", async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== process.env.ADMIN_TOKEN)
      return res.status(401).json({ error: "unauthorized" });

    const { city } = req.query;
    const wards = await Ward.find({ city });
    const totalWards = wards.length;

    const allApps = await Application.find({ "address.city": city });
    const totalApplications = allApps.length;
    const approved = allApps.filter((a) => a.status === "approved").length;
    const pending = allApps.filter((a) => a.status === "pending").length;
    const rejected = allApps.filter((a) => a.status === "rejected").length;

    res.json({
      totalWards,
      totalApplications,
      approved,
      pending,
      rejected,
      citySegregationPercent: 68,
      complaintsResolvedPercent: 78,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/wards", async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== process.env.ADMIN_TOKEN)
      return res.status(401).json({ error: "unauthorized" });

    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "city query param is required" });

    const wards = await Ward.find({ city }).lean();
    console.log("Wards found:", wards.length);

    const wardsWithStats = await Promise.all(
      wards.map(async (w) => {
        const champions = await Application.countDocuments({
          "address.selectedWard": w.wardNumber,
          "address.city": city,
          status: "approved",
        });
        const pendingRequests = await Application.countDocuments({
          "address.selectedWard": w.wardNumber,
          "address.city": city,
          status: "pending",
        });

        // For demo, we can calculate reports & complaints based on champions
        const reportsSubmitted = champions * 5;
        const complaintsResolved = champions * 10;

        return {
          wardNumber: w.wardNumber,
          locality: w.name,
          champions,
          pendingRequests,
          reportsSubmitted,
          complaintsResolved,
        };
      })
    );

    console.log("Wards stats:", wardsWithStats);

    res.json({ wards: wardsWithStats });
  } catch (err) {
    console.error("Error in /wards:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// Top Champions
router.get("/top-champions", async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== process.env.ADMIN_TOKEN)
      return res.status(401).json({ error: "unauthorized" });

    const { city, limit = 10 } = req.query;
    const top = await Application.find({
      "address.city": city,
      status: "approved",
    })
      .sort({ points: -1 })
      .limit(Number(limit));
    res.json({ top });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

