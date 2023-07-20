const UserModel = require('../models/userModel');
const Factory = require('../Api/ApiControllerFactory');

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
exports.updateUsers = Factory.updateAPI(UserModel);





/**
 * @desc delete user
 * @route /api/v1/users/:id
 * @method DELETE
 * @access private
 */
exports.deleteUsers = Factory.deleteAPI(UserModel);


