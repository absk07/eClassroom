module.exports = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        return res.json({ authRequired: true, message: "Please Login to continue." })
    }
}