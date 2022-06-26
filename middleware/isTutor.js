module.exports = (req, res, next) => {
    if(req.user.role === 'tutor') {
        next();
    } else {
        return res.json({ authRequired: true, message: "Please Login as Tutor to continue." })
    }
}