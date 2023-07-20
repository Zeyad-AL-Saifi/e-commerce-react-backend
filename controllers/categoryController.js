const CategoryModel = require('../models/categoryModel');
const Factory = require('../Api/ApiControllerFactory');
/**
 * @desc Get all categories
 * @route /api/v1/categories
 * @method GET
 * @access public
 */
exports.getAllCategories = Factory.getAllAPI(CategoryModel);

/**
 * @desc Get specific categories
 * @route /api/v1/categories/:id
 * @method GET
 * @access public
 */
exports.getCategoryByID = Factory.getByIdAPI(CategoryModel);


/**
 * @desc create category
 * @route /api/v1/categories
 * @method POST
 * @access private
 */
exports.createCategory = Factory.createAPI(CategoryModel);



/**
 * @desc update category
 * @route /api/v1/categories/:id
 * @method PUT
 * @access private
 */
exports.updateCategory = Factory.updateAPI(CategoryModel);




/**
 * @desc delete category
 * @route /api/v1/categories/:id
 * @method DELETE
 * @access private
 */
exports.deleteCategory = Factory.deleteAPI(CategoryModel);


