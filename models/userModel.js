const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [ true, 'name required' ]
    },
    slug: {
        type: String,
        lowercase: true,

    },
    email: {
        type: String,
        required: [ true, 'email required' ],
    },
    phone: String,
    profileImage: String,
    password: {
        type: String,
        required: [ true, 'password required' ],
        minlength: [ 8, 'To short password' ],
    },
    role: {
        type: String,
        enum: [ 'user', 'admin' ],
        default: 'user',
    },
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;