// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/authAdmin');
const resumeController = require('../controllers/resumeController');
const jobController = require('../controllers/jobController');

router.post('/signup', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/list/:skills', verifyToken, resumeController.listResumesBySkills);
router.post('/jobCreate',verifyToken, jobController.createJob);

module.exports = router;
