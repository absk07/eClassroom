const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const classRoutes = require('./class');

router.use('/', authRoutes);
router.use('/', classRoutes);

module.exports = router;