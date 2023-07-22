
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const UserModel = require('../models/userModel');

exports.signup = asyncHandler(async (req, res, next) =>
{
    //1-create user
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });
    //2-generate token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE_TIME }
    );
    res.status(201).json({ data: user, token });
});