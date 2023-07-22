const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const UserModel = require('../models/userModel');
const Factory = require('../Api/ApiControllerFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddlewere');
const ApiError = require('../utils/apiError');

// Upload single image
exports.uploadUserImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) =>
{
    const filename = `user-${ uuidv4() }-${ Date.now() }.jpeg`;

    if (req.file)
    {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/users/${ filename }`);

        // Save image into our db
        req.body.image = filename;
    }

    next();
});
/**
 * @desc Get all user
 * @route /api/v1/users
 * @method GET
 * @access private
 */
exports.getAllUsers = Factory.getAllAPI(UserModel);

/**
 * @desc Get specific user by id
 * @route /api/v1/users/:id
 * @method GET
 * @access private
 */
exports.getUserByID = Factory.getByIdAPI(UserModel);


/**
 * @desc create user
 * @route /api/v1/users
 * @method POST
 * @access private
 */
exports.createUsers = Factory.createAPI(UserModel);



/**
 * @desc update userd
 * @route /api/v1/users/:id
 * @method PUT
 * @access private
 */

exports.updateUsers = expressAsyncHandler(async (req, res, next) =>
{
    const document = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            image: req.body.image,
            role: req.body.role,

        },
        { new: true });
    if (!document)
    {
        return next(new ApiError(`No category for this id ${ req.params.id }`, 404));
    }
    res.status(200).json({ message: "updated sccessful", data: document });

});

//update password
exports.updatePassword = expressAsyncHandler(async (req, res, next) =>
{
    const document = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password, 12),

        },
        { new: true });
    if (!document)
    {
        return next(new ApiError(`No category for this id ${ req.params.id }`, 404));
    }
    res.status(200).json({ message: "updated sccessful", data: document });

});


/**
 * @desc delete user
 * @route /api/v1/users/:id
 * @method DELETE
 * @access private
 */
exports.deleteUsers = Factory.deleteAPI(UserModel);


