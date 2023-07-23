const bcrypt = require('bcryptjs');
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
        unique: [ true, 'email is alred exist' ],
        lowercase: true,
    },
    password: {
        type: String,
        required: [ true, 'password required' ],
        minlength: [ 8, 'To short password' ],
    },
    passwordChangedAt: Date,
    phone: String,
    image: String,
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

userSchema.pre("save", async function (next)
{
    if (!this.isModified("password")) return next();
    //hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();

});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;