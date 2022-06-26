const ClassRoom = require('../../models/class');
const File = require('../../models/file');

module.exports = {
    getClass: async(req, res, next) => {
        try { 
            if(req.user.role === 'student') {
                const myClass = await ClassRoom.aggregate([{$match: {students: { $elemMatch: { $eq: req.user._id } }}}]);
                // .populate('students', '_id username role').populate('admin', '_id username role').populate('files');
                await File.populate(myClass, {path: 'files'});
                res.json({
                    success: true,
                    data: myClass
                });
            }
            if(req.user.role === 'tutor') {
                const classAdmin = await ClassRoom.find({ admin: req.user._id }).populate('students', '_id username role').populate('admin', '_id username role').populate('files');
                res.json({
                    success: true,
                    data: classAdmin
                });
            }
        } catch(e) {
            next(e);
        }
    },
    getFiles: async(req, res, next) => {
        try {
            const { classId } = req.params; 
            const files = await ClassRoom.findById(classId).select('files').populate('files');
            res.json({
                success: true,
                data: files
            });
        } catch(e) {
            next(e);
        }
    },
    filterFiles: async(req, res, next) => {
        try {
            let { filetype, filename } = req.query;
            filetype = filetype && filetype.trim().length > 0 ? filetype.trim() : "all";
            filename = filename && filename.trim().length > 0 ? filename.trim() : "all";
            // console.log(filetype, filename);
            // if(filetype) filetype = filetype.trim();
            // if(filename) filename = filename.trim();
            const file = await File.aggregate([{  
                $match: {
                    $or: [
                        {
                            mimeType: {      
                                $regex: filetype,      
                                "$options": "i"    
                            }   
                        },
                        {
                            name: { 
                                $regex: filename, 
                                "$options": "i"
                            }
                        }
                    ]    
                }
            }]);
            if(file.length < 1) {
                return res.json({
                    success: true,
                    message: "No such file found."
                });
            }
            res.json({
                success: true,
                data: file
            });
        } catch(e) {
            next(e);
        }
    }
}