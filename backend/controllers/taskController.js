// controllers/taskController.js
const Task = require("../models/Task");

/**
 * Create a new task
 */
exports.createTask = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { title, description, assignedTo, points, deadline } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title required" });
    }

    const task = await Task.create({
      community: communityId,
      title,
      description,
      assignedTo: assignedTo || [],
      points: points || 0,
      deadline: deadline ? new Date(deadline) : null,
    });

    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update task status
 */
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
