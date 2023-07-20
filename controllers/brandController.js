const BrandsModel = require('../models/brandModel');
const Factory = require('../Api/ApiControllerFactory');

/**
 * @desc Get all brands
 * @route /api/v1/brands
 * @method GET
 * @access public
 */
exports.getAllBrands = Factory.getAllAPI(BrandsModel);

/**
 * @desc Get specific brand by id
 * @route /api/v1/brands/:id
 * @method GET
 * @access public
 */
exports.getBrandByID = Factory.getByIdAPI(BrandsModel);


/**
 * @desc create Brands
 * @route /api/v1/brands
 * @method POST
 * @access private
 */
exports.createBrands = Factory.createAPI(BrandsModel);



/**
 * @desc update Brands
 * @route /api/v1/brands/:id
 * @method PUT
 * @access private
 */
exports.updateBrands = Factory.updateAPI(BrandsModel);





/**
 * @desc delete Brands
 * @route /api/v1/brands/:id
 * @method DELETE
 * @access private
 */
exports.deleteBrands = Factory.deleteAPI(BrandsModel);


