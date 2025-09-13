// controllers/postController.js
const Post = require("../models/Post");

/**
 * Create a post
 */
exports.createPost = async (req, res) => {
  try {
    const { communityId } = req.params;
    const { content, attachments } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }

    const post = await Post.create({
      community: communityId,
      author: req.user._id,
      content,
      attachments: attachments || [],
    });

    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
