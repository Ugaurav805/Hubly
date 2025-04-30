const express = require('express');
const router = express.Router();

const { signupValidation, signinValidation } = require('../Middlewares/AuthValidation');
const { signup, signin, updateProfile } = require('../Controllers/AuthController');
const authMiddleware = require('../Middlewares/AuthMiddleware');

// Route to handle user signup
router.post('/signup', signupValidation, signup);

// Route to handle user signin
router.post('/signin', signinValidation, signin);

// Route to handle profile update (secured)
router.put('/update-profile', authMiddleware, updateProfile);

module.exports = router;
