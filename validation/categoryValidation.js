const { param, check } = require('express-validator');
const { default: slugify } = require('slugify');



exports.getIDCategoryRules = param('id')
    .isMongoId()
    .withMessage('Invalid category id format');


exports.deleteIDCategoryRules = param('id')
    .isMongoId()
    .withMessage('Invalid category id format');

exports.createCategoryRules = [
    check("name").notEmpty().withMessage('Category required')
        .isLength({ min: 3 }).withMessage('Too short category name')
        .isLength({ max: 32 }).withMessage('Too long category name').custom((value, { req }) =>
        {
            req.body.slug = slugify(value);
            return true;

        })
];

exports.updateCategoryRules = [
    param('id')
        .isMongoId()
        .withMessage('Invalid category id format'),
    check("name").notEmpty().withMessage('Category required')
        .isLength({ min: 3 }).withMessage('Too short category name')
        .isLength({ max: 32 }).withMessage('Too long category name')
        .custom((value, { req }) =>
        {
            req.body.slug = slugify(value);
            return true;

        })
];