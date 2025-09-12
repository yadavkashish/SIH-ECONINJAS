const express = require("express");
const Application = require("../models/Application");
const Ward = require("../models/Ward");

const router = express.Router()

const ADMIN_HEADER = "x-admin-token"

/**
 * POST /api/apply
 * Body: application fields (see model)
 */
router.post('/apply', async (req, res) => {
  try {
    const payload = req.body;
    // Minimal validation
    if (!payload.fullName || !payload.mobile || !payload.address || !payload.address.city) {
      return res.status(400).json({ error: 'missing required fields' });
    }
    const app = new Application(payload);
    await app.save();
    res.json({ message: 'application submitted', id: app._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

/**
 * GET /api/applications/pending?city=Ghaziabad
 * Protected by admin token header (simple demo)
 */
router.get('/pending', async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== (process.env.ADMIN_TOKEN || 'change-me-to-a-secure-token')) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    const { city } = req.query;
    const filter = { status: 'pending' };
    if (city) filter['address.city'] = city;
    const pending = await Application.find(filter).sort({ createdAt: -1 }).limit(500).lean();
    res.json({ pending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

/**
 * POST /api/applications/:id/approve
 * POST /api/applications/:id/reject
 * Body optional: { note: "..." }
 */
router.post('/:id/approve', async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== (process.env.ADMIN_TOKEN || 'change-me-to-a-secure-token')) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'application not found' });
    app.status = 'approved';
    await app.save();
    res.json({ message: 'approved', id: app._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/:id/reject', async (req, res) => {
  try {
    const adminToken = req.header(ADMIN_HEADER);
    if (adminToken !== (process.env.ADMIN_TOKEN || 'change-me-to-a-secure-token')) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'application not found' });
    app.status = 'rejected';
    await app.save();
    res.json({ message: 'rejected', id: app._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

/**
 * GET /api/wards/:wardNumber/champions?city=Ghaziabad
 * Returns approved champions in a ward
 */
router.get('/ward/:wardNumber/champions', async (req, res) => {
  try {
    const { wardNumber } = req.params;
    const { city } = req.query;
    const filter = {
      'address.selectedWard': Number(wardNumber),
      status: 'approved'
    };
    if (city) filter['address.city'] = city;
    const champions = await Application.find(filter).lean();
    res.json({ champions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;

