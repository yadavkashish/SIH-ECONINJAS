// routes/communities.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { isMunicipalOfficer } = require("../middleware/roleMiddleware");

const {
  createCommunity,
  listCommunities,
  getCommunity,
  addMember,
  removeMember,
} = require("../controllers/communityController");

const { createPost } = require("../controllers/postController");
const { createTask, updateTaskStatus } = require("../controllers/taskController");
const { createComplaint, updateComplaint } = require("../controllers/championComplaintController");

const router = express.Router();

// Public: list communities
router.get("/", protect, listCommunities); // allow only logged-in or remove protect if public

// Admin / Municipal only
router.post("/", protect, isMunicipalOfficer, createCommunity);

// Community details
router.get("/:id", protect, getCommunity);

// Members
router.post("/:communityId/members", protect, isMunicipalOfficer, addMember);
router.delete("/:communityId/members/:userId", protect, isMunicipalOfficer, removeMember);

// Posts - champions & officers can post
router.post("/:communityId/posts", protect, createPost);

// Tasks - only champions/officers
router.post("/:communityId/tasks", protect, createTask);
router.patch("/tasks/:id/status", protect, updateTaskStatus);

// Complaints - citizens & champions can create; officers can update
router.post("/:communityId/complaints", protect, createComplaint);
router.patch("/complaints/:id", protect, updateComplaint);

module.exports = router;
