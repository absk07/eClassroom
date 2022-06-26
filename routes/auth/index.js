const express = require('express');
const router = express.Router();

const signupRoutes = require('./signup');
const signinRoutes = require('./signin');

router.use('/signup', signupRoutes);
router.use('/signin', signinRoutes);

module.exports = router; 