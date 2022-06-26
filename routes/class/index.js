const express = require('express');
const router = express.Router();

const verifyToken = require('../../middleware/verifyToken');
const isAuth = require('../../middleware/isAuth');
const isTutor = require('../../middleware/isTutor');
const classroomRoutes = require('./classroom');
const fileRoutes = require('./files');
const dashboardRoutes = require('./dashboard');

router.use(verifyToken);

router.use('/classroom', isAuth, dashboardRoutes);
router.use('/classroom', isAuth, isTutor, classroomRoutes);
router.use('/classroom', isAuth, isTutor, fileRoutes);

module.exports = router; 