const mongoose = require("mongoose");
const GreenChampion = require("../models/GreenChampion");
const User = require("../models/User");

const ADMIN_HEADER = "x-admin-token";

// ✅ Apply once (using mobile as unique identifier)
exports.applyChampion = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const payload = req.body;
    console.log("Payload received:", req.body);

    if (!payload.fullName || !payload.mobile || !payload.address || !payload.address.city) {
      return res.status(400).json({ error: 'missing required fields' });
    }

    // Check if already applied with same mobile
    const existing = await GreenChampion.findOne({ mobile: payload.mobile });
    if (existing) {
      return res.status(400).json({ error: 'You have already applied' });
    }

    const app = new GreenChampion({ ...payload, user: req.user._id });

    await app.save();

    res.json({ message: 'GreenChampion submitted', id: app._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

// ✅ Get pending applications (admin only)
exports.getPendingChampions = async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== (process.env.ADMIN_TOKEN || 'change-me-to-a-secure-token')) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const { city } = req.query;
    const filter = { status: 'pending' };
    if (city) filter['address.city'] = city;

    const pending = await GreenChampion.find(filter).sort({ createdAt: -1 }).limit(500).lean();
    res.json({ pending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

// ✅ Approve champion
exports.approveChampion = async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== (process.env.ADMIN_TOKEN || 'change-me-to-a-secure-token')) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const app = await GreenChampion.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'GreenChampion not found' });

    app.status = 'approved';
    await app.save();

    res.json({ message: 'approved', id: app._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

// ✅ Reject champion
exports.rejectChampion = async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== (process.env.ADMIN_TOKEN || 'change-me-to-a-secure-token')) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const app = await GreenChampion.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'GreenChampion not found' });

    app.status = 'rejected';
    await app.save();

    res.json({ message: 'rejected', id: app._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

// ✅ Get approved champions in a ward
exports.getWardChampions = async (req, res) => {
  try {
    const { wardNumber } = req.params;
    const { city } = req.query;

    const filter = {
      'address.selectedWard': Number(wardNumber),
      status: 'approved'
    };
    if (city) filter['address.city'] = city;

    const champions = await GreenChampion.find(filter).lean();
    res.json({ champions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

exports.getMyApplication = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authorized" });

  const application = await GreenChampion.findOne({ user: req.user._id });
  res.json(application);
};
