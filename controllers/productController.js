const ProductModel = require('../models/productModel');
const Factory = require('../Api/ApiControllerFactory');

/**
 * @desc Get all products
 * @route /api/v1/products
 * @method GET
 * @access public
 */
exports.getAllProducts = Factory.getAllAPI(ProductModel, ProductModel);

/**
 * @desc Get specific product
 * @route /api/v1/products/:id
 * @method GET
 * @access public
 */
exports.getProductByID = Factory.getByIdAPI(ProductModel);


/**
 * @desc create product
 * @route /api/v1/products
 * @method POST
 * @access private
 */
exports.createProduct = Factory.createAPI(ProductModel);


/**
 * @desc update category
 * @route /api/v1/products/:id
 * @method PUT
 * @access private
 */
exports.updateProduct = Factory.updateAPI(ProductModel);





/**
 * @desc delete product
 * @route /api/v1/products/:id
 * @method DELETE
 * @access private
 */
exports.deleteProduct = Factory.deleteAPI(ProductModel);

