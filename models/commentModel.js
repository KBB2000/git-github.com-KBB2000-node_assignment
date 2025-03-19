const { db } = require('../utils/db');

const commentsCollection = db.collection('comments');

module.exports = commentsCollection;