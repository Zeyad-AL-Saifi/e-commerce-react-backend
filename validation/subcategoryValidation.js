const { param, check, body } = require('express-validator');
const { default: slugify } = require('slugify');



exports.getIDSubCategoryRules = param('id')
    .isMongoId()
    .withMessage('Invalid Subcategory id format');


exports.deleteIDSubCategoryRules = param('id')
    .isMongoId()
    .withMessage('Invalid Subcategory id format');

exports.createSubCategoryRules = [
    check("name")
        .notEmpty()
        .withMessage('SubCategory required')
        .isLength({ min: 3 })
        .withMessage('Too short Subcategory name')
        .isLength({ max: 32 })
        .withMessage('Too long Subcategory name')
        .custom((value, { req }) =>
        {
            req.body.slug = slugify(value);
            return true;

        })
    , check("category")
        .notEmpty()
        .withMessage('SubCategory required')
        .isMongoId().withMessage("invalid category id format")
        .isLength({ min: 3 }).withMessage('Too short Subcategory name')
        .isLength({ max: 32 }).withMessage('Too long Subcategory name')
];

exports.updateSubCategoryRules = [
    param('id')
        .isMongoId()
        .withMessage('Invalid Subcategory id format'),
    body("name")
        .custom((value, { req }) =>
        {
            req.body.slug = slugify(value);
            return true;

        })
];