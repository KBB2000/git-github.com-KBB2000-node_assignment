const axios = require('axios');
const usersCollection = require('../models/userModel');
const postsCollection = require('../models/postModel');
const commentsCollection = require('../models/commentModel');

exports.loadData = async (req, res) => {
  try {
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');

    const users = usersResponse.data;
    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    await usersCollection.insertMany(users);
    await postsCollection.insertMany(posts);
    await commentsCollection.insertMany(comments);
    res.status(200).json({ message: 'Data loaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUserData = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await usersCollection.findOne({ id: parseInt(userId) });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const userPosts = await postsCollection.find({ userId: parseInt(userId) }).toArray();

    for (let post of userPosts) {
      const postComments = await commentsCollection.find({ postId: post.id }).toArray();
      post.comments = postComments;
    }

    user.posts = userPosts;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllUsers = async (req, res) => {
  await usersCollection.deleteMany({});
  res.status(200).json({ message: 'All users deleted successfully' });
};

exports.deleteUserById = async (req, res) => {
  const { userId } = req.params;
  await usersCollection.deleteOne({ id: parseInt(userId) });
  res.status(200).json({ message: 'User deleted successfully' });
};



exports.addUser = async (req, res) => {
  const newUser = req.body;

  try {
    const existingUser = await usersCollection.findOne({ id: newUser.id });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    await usersCollection.insertOne(newUser);

    res.status(201).location(`/users/${newUser.id}`).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};