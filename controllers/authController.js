
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/apiError');
const UserModel = require('../models/userModel');



const createToken = (payload) => jwt.sign(
    { userId: payload },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
);


exports.signup = asyncHandler(async (req, res, next) =>
{
    //1-create user
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });
    //2-generate token
    const token = createToken(user._id);

    res.status(201).json({ data: user, token });
});


exports.login = asyncHandler(async (req, res, next) =>
{
    //1-check if email and password correct
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new ApiError("The email dose not exist"));

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return next(new ApiError("The password dose not correct"));
    //2-generate token
    const token = createToken(user._id);


    //3-send res  
    res.status(200).json({ data: user, token });

});

exports.auth = asyncHandler(async (req, res, next) =>
{
    //-1 check if token exist
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer"))
    {
        token = req.headers.authorization.split(" ")[ 1 ];
    }
    if (!token) return next(new
        ApiError("You are not login, please login first", 401));


    //2-verify token (no change happens, or token is expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


    //3-check if user exist

    const currentUser = await UserModel.findById(decoded.userId);
    if (!currentUser)
    {
        return next(
            new ApiError('The user than belong to this token does not exist', 401)
        );
    }

    //4-check if user change his password after token created
    if (currentUser.passwordChangedAt)
    {
        const passwordChangedTimeStamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000, 10
        );
        //the password changed after token created
        if (passwordChangedTimeStamp > decoded.iat)
        {
            return next(new ApiError('User recently changed his password ,please login again...', 401));
        }

    }
    req.user = currentUser;
    next();

});