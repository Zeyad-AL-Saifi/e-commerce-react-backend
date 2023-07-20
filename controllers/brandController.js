const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const expressAsyncHandler = require('express-async-handler');
const BrandsModel = require('../models/brandModel');
const Factory = require('../Api/ApiControllerFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddlewere');



// Upload single image
exports.uploadBrandImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) =>
{
    const filename = `brand-${ uuidv4() }-${ Date.now() }.jpeg`;

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 95 })
        .toFile(`uploads/brands/${ filename }`);

    // Save image into our db 
    req.body.image = filename;

    next();
});
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


