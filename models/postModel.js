const { db } = require('../utils/db');

const postsCollection = db.collection('posts');

module.exports = postsCollection;