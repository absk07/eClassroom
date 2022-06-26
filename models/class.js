const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    files: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Class', ClassSchema);