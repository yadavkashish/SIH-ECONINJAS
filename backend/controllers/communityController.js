// controllers/communityController.js
const Community = require("../models/Community");
const Post = require("../models/Post");
const Task = require("../models/Task");
const Complaint = require("../models/Complaint");
const User = require("../models/User");

/**
 * Create community (admin/municipal)
 */
exports.createCommunity = async (req, res) => {
  try {
    const { city, wardNumber, name } = req.body;
    if (!city || !wardNumber || !name) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const exists = await Community.findOne({ city, wardNumber });
    if (exists) {
      return res.status(400).json({ error: "Community already exists for this ward" });
    }

    const community = await Community.create({ city, wardNumber, name, members: [] });
    res.json({ community });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all communities for a city (or all)
 */
exports.listCommunities = async (req, res) => {
  try {
    const { city } = req.query;
    const filter = city ? { city } : {};
    const communities = await Community.find(filter).lean();
    res.json({ communities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get single community with members, posts, tasks, complaints
 */
exports.getCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const community = await Community.findById(id)
      .populate("members.user", "name email role")
      .lean();
    if (!community) return res.status(404).json({ error: "Community not found" });

    const posts = await Post.find({ community: id }).populate("author", "name").sort({ createdAt: -1 }).lean();
    const tasks = await Task.find({ community: id }).populate("assignedTo", "name").sort({ createdAt: -1 }).lean();
    const complaints = await Complaint.find({ community: id }).populate("raisedBy", "name").sort({ createdAt: -1 }).lean();

    res.json({ community, posts, tasks, complaints });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Add member to community (used when application approved or manually by admin)
 */
exports.addMember = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { userId, role } = req.body; // role optional
    const comm = await Community.findById(communityId);
    if (!comm) return res.status(404).json({ error: "Community not found" });

    if (comm.members.some(m => m.user.toString() === userId)) {
      return res.status(400).json({ error: "User already member" });
    }

    comm.members.push({ user: userId, role: role || "champion" });
    await comm.save();
    res.json({ message: "Member added", community: comm });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Remove member
 */
exports.removeMember = async (req, res) => {
  try {
    const { communityId, userId } = req.params;
    const comm = await Community.findById(communityId);
    if (!comm) return res.status(404).json({ error: "Community not found" });

    comm.members = comm.members.filter(m => m.user.toString() !== userId);
    await comm.save();
    res.json({ message: "Member removed", community: comm });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
