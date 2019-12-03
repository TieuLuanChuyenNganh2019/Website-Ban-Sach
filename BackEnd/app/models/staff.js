const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [
            validator.isEmail(),
            validator.len(6, 64),
        ]
    },
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: [
            validator.len(8, 64),
            validator.notContains(' '),
        ]
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Staff', staffSchema);