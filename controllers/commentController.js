const commentsCollection = require('../models/commentModel');

// Get all comments
exports.getAllComments = async (req, res) => {
  const comments = await commentsCollection.find({}).toArray();
  res.status(200).json(comments);
};