const express = require('express');
const router = express.Router();

const { getClass, getFiles, filterFiles } = require('../../controllers/class/dashboard');

router.get('/dashboard', getClass);
router.get('/dashboard/:classId', getFiles);
router.get('/files/filter', filterFiles);

module.exports = router; 