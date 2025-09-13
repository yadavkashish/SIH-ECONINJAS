const User = require("../models/User");

// @desc    Update user role
// @route   PATCH /api/users/:id/role
// @access  Municipal Officer/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Role updated successfully", user });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update role",
      error: err.message,
    });
  }
};
