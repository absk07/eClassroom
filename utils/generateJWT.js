const jwt = require('jsonwebtoken');

function generateToken(userId, role) {
    const token = jwt.sign(
        {
            id: userId,
            role
        }, 
        process.env.JWT_SECRET || "Om%:DG*aU4;6o5;@[zov5l4=NB1vZJ"
    );
    return token;
}

module.exports = generateToken;