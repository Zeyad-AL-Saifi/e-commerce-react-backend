
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const expressAsyncHandler = require('express-async-handler');
const ProductModel = require('../models/productModel');
const Factory = require('../Api/ApiControllerFactory');
const { uploadMixOfImages } = require('../middlewares/uploadImageMiddlewere');


exports.uploadProductImages = uploadMixOfImages([
    {
        name: 'imageCover',
        maxCount: 1,
    },
    {
        name: 'images',
        maxCount: 5,
    },
]);

exports.resizeProductImages = expressAsyncHandler(async (req, res, next) =>
{
    // console.log(req.files);
    //1- Image processing for imageCover
    if (req.files.imageCover)
    {
        const imageCoverFileName = `product-${ uuidv4() }-${ Date.now() }-cover.jpeg`;

        await sharp(req.files.imageCover[ 0 ].buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${ imageCoverFileName }`);

        // Save image into our db
        req.body.imageCover = imageCoverFileName;
    }
    //2- Image processing for images
    if (req.files.images)
    {
        req.body.images = [];
        await Promise.all(
            req.files.images.map(async (img, index) =>
            {
                const imageName = `product-${ uuidv4() }-${ Date.now() }-${ index + 1 }.jpeg`;

                await sharp(img.buffer)
                    .resize(2000, 1333)
                    .toFormat('jpeg')
                    .jpeg({ quality: 95 })
                    .toFile(`uploads/products/${ imageName }`);

                // Save image into our db
                req.body.images.push(imageName);
            })
        );


    } next();
});
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

