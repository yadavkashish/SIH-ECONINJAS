const express = require("express");
const Ward = require("../models/Ward");

const router = express.Router()

/**
 * GET /api/wards
 * Query params:
 *   city - required (e.g., "Ghaziabad")
 *   pin - optional
 *   locality - optional
 *
 * Returns:
 *  { suggestedWard: <number|null>, wards: [ ... ] }
 */
router.get('/', async (req, res) => {
  try {
    const { city, pin, locality } = req.query;
    if (!city) return res.status(400).json({ error: 'city is required' });

    const wards = await Ward.find({ city }).lean();

    let suggestedWard = null;

    // 1) Try pin-based mapping
    if (pin) {
      const byPin = wards.find(w => (w.pincodes || []).includes(String(pin)));
      if (byPin) suggestedWard = byPin.wardNumber;
    }

    // 2) Try locality substring matching (case-insensitive)
    if (!suggestedWard && locality) {
      const lc = locality.toLowerCase();
      const byLocality = wards.find(w =>
        (w.localities || []).some(l => l.toLowerCase().includes(lc))
      );
      if (byLocality) suggestedWard = byLocality.wardNumber;
    }

    // return wards (basic info) + suggestion
    const slimWards = wards.map(w => ({
      wardNumber: w.wardNumber,
      name: w.name,
      pincodes: w.pincodes,
      localities: w.localities
    }));

    res.json({ suggestedWard, wards: slimWards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
