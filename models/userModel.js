const { db } = require('../utils/db');

const usersCollection = db.collection('users');

module.exports = usersCollection;