const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
        // console.log(authHeader);
        if(!authHeader) {
            req.user = null;
            return res.status(401).json({ success: false, authRequired: true, message: 'Invalid authorization' });
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET || "Om%:DG*aU4;6o5;@[zov5l4=NB1vZJ");
        } catch(err) {
            return res.json({ success: false, authRequired: true, message: "Please Login to continue." })
        }
        if(!decodedToken) {
            return res.json({ success: false, authRequired: true, message: "Please Login to continue." })
        }
        const user = await User.findById(decodedToken.id);
        if(!user) {
            return res.json({ success: false, authRequired: true, message: "Please Login to continue." })
        }
        req.user = user;
        next();
    } catch(error) {
        return res.json({ success: false, authRequired: true, message: "Please Login to continue." })
    }
};