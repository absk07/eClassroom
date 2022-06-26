const ClassRoom = require('../models/class');

module.exports = async(req, res, next) => {
    const classroom = await ClassRoom.findById(req.params.classId);
    if(classroom.admin.toString() === req.user._id.toString()) {
        next();
    } else {
        return res.json({ unauthorized: true, message: "You are not the owner of this class." })
    }
}