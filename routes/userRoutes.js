const express = require('express');
const { loadData, getUserData, deleteAllUsers, deleteUserById,addUser } = require('../controllers/userController');
const router = express.Router();

router.get('/load', loadData);
router.get('/users/:userId', getUserData);
router.delete('/users', deleteAllUsers);
router.delete('/users/:userId', deleteUserById);
router.put('/users', addUser);

module.exports = router;