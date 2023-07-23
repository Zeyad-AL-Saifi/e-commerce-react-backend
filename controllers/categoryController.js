const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const expressAsyncHandler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');
const Factory = require('../Api/ApiControllerFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddlewere');



// Upload single image
exports.uploadCategoryImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = expressAsyncHandler(async (req, res, next) =>
{
    const filename = `category-${ uuidv4() }-${ Date.now() }.jpeg`;

    if (req.file)
    {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/categories/${ filename }`);

        // Save image into our db
        req.body.image = filename;
    }

    next();
});


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


