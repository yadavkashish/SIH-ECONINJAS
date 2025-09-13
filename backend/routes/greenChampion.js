const express = require("express");
const {
  applyChampion,
  getPendingChampions,
  approveChampion,
  rejectChampion,
  getWardChampions,
  getMyApplication
} = require("../controllers/greenChampionController");

const { protect } = require("../middleware/authMiddleware");
const { isMunicipalOfficer } = require("../middleware/roleMiddleware");

const router = express.Router();

// Routes
router.post('/apply', protect, applyChampion);
router.get('/my', protect, getMyApplication);

router.get('/pending', getPendingChampions);

router.post('/:id/approve', protect, isMunicipalOfficer, approveChampion);
router.post('/:id/reject', protect, isMunicipalOfficer, rejectChampion);

router.get('/ward/:wardNumber/champions', getWardChampions);

module.exports = router;
