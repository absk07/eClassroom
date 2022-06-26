const { cloudinary } = require('../../utils/fileStorage');
const ClassRoom = require('../../models/class');
const User = require('../../models/user');
const File = require('../../models/file');

module.exports = {
    addFile: async(req, res, next) => {
        try {
            const { classId } = req.params;
            const { name, description } = req.body;
            const classroom = await ClassRoom.findById(classId);
            // console.log(req.file)
            if(!classroom) {
                return res.json({
                    success: true,
                    message: "Classroom doesn't exist."
                });
            }
            const newFile = new File({ name, description });
            newFile.uploadedBy = req.user;
            newFile.url = req.file.path;
            newFile.mimeType = req.file.mimetype.split('/')[0];
            newFile.filename = req.file.filename;
            classroom.files.push(newFile);
            await newFile.save();
            await classroom.save();
            res.json({
                success: true,
                message: "File added successfully."
            });
        } catch(e) {
            next(e);
        }
    },
    updateFile: async(req, res, next) => {
        try {
            const { classId, fileId } = req.params;
            const { name, description } = req.body;
            const classroom = await ClassRoom.findById(classId);
            const file = await File.findById(fileId);
            // console.log(req.file)
            if(!classroom) {
                return res.json({
                    success: true,
                    message: "Classroom doesn't exist."
                });
            }
            if(!file) {
                return res.json({
                    success: true,
                    message: "File doesn't exist."
                });
            }
            let oldFileUrl = file.url;
            let oldFilename = file.filename;
            if(req.file) {
                await cloudinary.uploader.destroy(oldFilename);
                file.url = req.file.path;
                file.filename = req.file.filename;
            } else {
                file.url = oldFileUrl;
                file.filename = oldFilename;
            }
            file.name = name;
            file.description = description;
            await file.save();
            res.json({
                success: true,
                message: "File updated successfully."
            });
        } catch(e) {
            next(e);
        }
    },
    deleteFile: async(req, res, next) => {
        try {
            const { classId, fileId } = req.params;
            const classroom = await ClassRoom.findById(classId);
            const file = await File.findById(fileId);
            if(!classroom) {
                return res.json({
                    success: true,
                    message: "Classroom doesn't exist."
                });
            }
            if(!file) {
                return res.json({
                    success: true,
                    message: "File doesn't exist."
                });
            }
            await cloudinary.uploader.destroy(file.filename);
            await ClassRoom.findByIdAndUpdate(classId, { $pull: { files: file._id } });
            await file.remove();
            res.json({
                success: true,
                message: "File deleted successfully."
            });
        } catch(e) {
            next(e);
        }
    }
}