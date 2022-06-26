const express = require('express');
const router = express.Router();
const multer = require('multer');

const { addFile, updateFile, deleteFile } = require('../../controllers/class/files');
const { storage } = require('../../utils/fileStorage');
const upload = multer({ storage });
const isAuthor = require('../../middleware/isAuthor');

router.post('/:classId/addFile', isAuthor, upload.single('classfiles'), addFile);
router.put('/:classId/updateFile/:fileId', isAuthor, upload.single('classfiles'), updateFile);
router.delete('/:classId/deleteFile/:fileId', isAuthor, deleteFile);

module.exports = router; 