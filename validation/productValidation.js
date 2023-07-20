const { check, body } = require('express-validator');
const { default: slugify } = require('slugify');
const CategoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCategoryModel');

exports.createProductValidation = [
    check('title')
        .isLength({ min: 3 })
        .withMessage('most be at least 3 chars')
        .notEmpty()
        .withMessage('product required').custom((val, { req }) =>
        {
            req.body.slug = slugify(val);
            return true;
        })
    ,
    check('description')
        .notEmpty()
        .withMessage('product description required')
        .isLength({ max: 2000 })
        .withMessage('To long description'),
    check('quantity')
        .notEmpty()
        .withMessage('quantity required')
        .isNumeric()
        .withMessage('product quantity most be number'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('product sold most be number'),
    check('price')
        .notEmpty()
        .withMessage('product price is required')
        .isNumeric()
        .withMessage('product price most be number')
        .isLength({ max: 32 })
        .withMessage('To long price'),
    check('priceAfterDescount')
        .optional()
        .isNumeric().withMessage('product priceAfterDescount must be a number')
        .toFloat()
        .custom((value, { req }) =>
        {
            if (req.body.price <= value)
            {
                throw new Error('priceAfterDiscount must be lower then normal price');
            }
            return true;
        }),
    check('colors').optional().isArray().withMessage('product colors most bee array of string')
    ,
    check('imageCover')
        .notEmpty()
        .withMessage('product imageCover is required'),
    check('images')
        .optional()
        .isArray()
        .withMessage('product imageCover is required'),
    check('category')
        .notEmpty()
        .withMessage('product must be belong to a category')
        .isMongoId()
        .withMessage('Invalid ID formate')
        .custom((categoryId) =>
            CategoryModel.findById(categoryId).then((category) =>
            {
                if (!category)
                {
                    return Promise.reject(
                        new Error(
                            `NO category for this id: ${ categoryId }`));
                }
            })
        ),
    check('subCategory')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID formate')
        .custom((subCategoryId) =>
            subCategoryModel.find({ _id: { $exists: true, $in: subCategoryId } })
                .then((result) =>
                {
                    if (result.length < 1 || result.length !== subCategoryId.length)
                    {
                        return Promise.reject(
                            new Error(
                                `Invalid subcategoriesId`));
                    }
                })
        ).custom((values, { req }) =>
            subCategoryModel
                .find({ category: req.body.category })
                .then((subCategories) =>
                {
                    const subCategoriesIdsINDB = [];
                    subCategories.forEach((ele) =>
                    {
                        subCategoriesIdsINDB.push(ele._id.toString());
                    });
                    const checker = (target, arr) => target.every((v) => arr.includes(v));
                    if (!checker(values, subCategoriesIdsINDB))
                    {
                        return Promise.reject(
                            new Error(`subcategories not belong to category`)
                        );
                    }

                }
                )
        ),
    check('brand').optional().isMongoId()
        .withMessage('Invalid ID formate'),
    check('rate')
        .optional()
        .isNumeric()
        .withMessage('rate must be a number')
        .isLength({ min: 1 }).withMessage('rating must be above or equal 1.0')
        .isLength({ max: 1 }).withMessage('rating must be belows or equal 1.0'),
    check('ratingQuantity')
        .optional()
        .isNumeric()
        .withMessage('ratingQuantity must be a number')

];

exports.getProductValidation = [
    check('id').isMongoId().withMessage('incalid ID format'),

];
exports.updateProductValidation = [
    check('id')
        .isMongoId()
        .withMessage('incalid ID format'),
    body('title').custom((value, { req }) =>
    {
        req.body.slug = slugify(value);
        return true;

    }),

];
exports.deleteProductValidation = [
    check('id').isMongoId().withMessage('incalid ID format'),

];
