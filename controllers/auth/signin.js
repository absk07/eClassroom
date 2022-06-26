const User = require('../../models/user');
const generateToken = require('../../utils/generateJWT');

module.exports = {
    signIn: async(req, res, next) => {
        try {
            const { username, password, role } = req.body;
            // console.log(req.body);
            let user = null;
            if(username) {
                user = await User.findOne({ username });
                if(!user) {
                    return res.json({ success: true, data: { login: false, msg: "User with this email does not exist." } })
                }
            }
            // console.log(user.validatePassword(password))
            if(!user.validatePassword(password)) {
                return res.json({ success: true, data: { login: false, msg: "Incorrect Password." } });
            }
            res.json({
                success: true,
                data: {
                    login: true,
                    userId: user._id,
                    token: generateToken(user._id.toString(), role)
                }
            });
        } catch(e) {
            next(e);
        }
    }
}