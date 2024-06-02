// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const resumeController = require('../controllers/resumeController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/submitResume', verifyToken, resumeController.submitResume);

module.exports = router;
