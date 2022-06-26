const ClassRoom = require('../../models/class');
const User = require('../../models/user');

module.exports = {
    newClass: async(req, res, next) => {
        try {
            const { name, description } = req.body;
            const classroom = await ClassRoom.findOne({ name });
            if(classroom) {
                return res.json({
                    success: true,
                    message: "Classroom already exists."
                });
            }
            const newClass = new ClassRoom({ name, description, admin: req.user });
            await newClass.save();
            res.json({
                success: true,
                message: "ClassRoom successfully created."
            });
        } catch(e) {
            next(e);
        }
    },
    updateClass: async(req, res, next) => {
        try {
            const { classId } = req.params;
            const { name, description } = req.body;
            const classroom = await ClassRoom.findById(classId);
            if(!classroom) {
                return res.json({
                    success: true,
                    message: "Classroom doesn't exist."
                });
            }
            classroom.name = name;
            classroom.description = description;
            await classroom.save();
            res.json({
                success: true,
                message: "Classroom updated successfully."
            });
        } catch(e) {
            next(e);
        }
    },
    deleteClass: async(req, res, next) => {
        try {
            const { classId } = req.params;
            const classroom = await ClassRoom.findById(classId);
            if(!classroom) {
                return res.json({
                    success: true,
                    message: "Classroom doesn't exist."
                });
            }
            await classroom.remove();
            res.json({
                success: true,
                message: "Classroom deleted successfully."
            });
        } catch(e) {
            next(e);
        }
    },
    newStudent: async(req, res, next) => {
        try {
            const { studentId } = req.body;
            const { classId } = req.params;
            const student = await User.findById(studentId);
            const classroom = await ClassRoom.findById(classId);
            if(!classroom) {
                return res.json({
                    success: true,
                    message: "Classroom doesn't exist."
                });
            }
            if(!student) {
                return res.json({
                    success: true,
                    message: "Student doesn't exist."
                });
            } 
            if(classroom.students.includes(studentId)) {
                return res.json({
                    success: true,
                    message: "Student is already in this class."
                });
            }
            classroom.students.push(studentId);
            await classroom.save();
            res.json({
                success: true,
                message: "Students added to classroom successfully."
            });
        } catch(e) {
            next(e);
        }
    },
    removeStudent: async(req, res, next) => {
        try {
            const { studentId } = req.body;
            const { classId } = req.params;
            const student = await User.findById(studentId);
            const classroom = await ClassRoom.findById(classId);
            if(!classroom) {
                return res.json({
                    success: true,
                    message: "Classroom doesn't exist."
                });
            }
            if(!student) {
                return res.json({
                    success: true,
                    message: "Student doesn't exist."
                });
            } 
            if(!classroom.students.includes(studentId)) {
                return res.json({
                    success: true,
                    message: "Student is not in this class."
                });
            }
            classroom.students.pull(studentId);
            await classroom.save();
            res.json({
                success: true,
                message: "Students removed from classroom successfully."
            });
        } catch(e) {
            next(e);
        }
    }
}