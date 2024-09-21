const express = require('express');
const { register, login, changePassword, deleteAccount } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/change-password', authMiddleware, changePassword);
router.delete('/delete-account', authMiddleware, deleteAccount);

module.exports = router;
