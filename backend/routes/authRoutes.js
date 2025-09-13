const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { updateUserRole } = require("../controllers/userController");
const { isMunicipalOfficer } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.patch("/:id/role", protect, isMunicipalOfficer, updateUserRole );

module.exports = router;
