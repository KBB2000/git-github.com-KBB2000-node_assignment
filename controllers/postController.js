const postsCollection = require('../models/postModel');

// Get all posts
exports.getAllPosts = async (req, res) => {
  const posts = await postsCollection.find({}).toArray();
  res.status(200).json(posts);
};