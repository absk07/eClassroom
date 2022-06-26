const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student',
        enum: ['tutor', 'student']
    }
}, {
    timestamps: true
});

UserSchema.methods.validatePassword = function(password) {
    return this.password === crypto.createHmac('sha256', process.env.PASSWORD_HASH_STRING || 'secret!').update(password).digest('hex');
};

module.exports = mongoose.model('User', UserSchema);