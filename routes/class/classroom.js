const express = require('express');
const router = express.Router();

const isAuthor = require('../../middleware/isAuthor');
const { newClass, updateClass, deleteClass, newStudent, removeStudent } = require('../../controllers/class/classroom');

router.post('/add', newClass);
router.put('/update/:classId', isAuthor, updateClass);
router.delete('/delete/:classId', isAuthor, deleteClass);

router.post('/:classId/addStudent', isAuthor, newStudent);
router.delete('/:classId/deleteStudent', isAuthor, removeStudent);

module.exports = router; 