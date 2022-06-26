const User = require('../../models/user');
const generateToken = require('../../utils/generateJWT');
const hashPassword = require('../../utils/hashPassword');

module.exports = {
    signUp: async(req, res, next) => {
        try {
            // console.log(req.body)
            let { username, password, role } = req.body;
            const userExists = await User.findOne({ username });
            if(userExists) {
                return res.json({ success: true, message: "User already exists." });
            }
            req.body.password = hashPassword(password);
            const user = await new User(req.body).save();
            res.json({
                success: true,
                data: {
                    registered: true,
                    userId: user._id,
                    token: generateToken(user._id.toString(), role),
                    message: "Registration Successful!"
                }
            });
        } catch(e) {
            next(e);
        }
    }
}