const crypto = require('crypto');

module.exports = (password) => {
    return crypto.createHmac('sha256', process.env.PASSWORD_HASH_STRING || 'secret!').update(password).digest('hex');
}