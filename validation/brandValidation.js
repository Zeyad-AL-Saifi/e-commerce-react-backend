const { param, check } = require('express-validator');
const { default: slugify } = require('slugify');



exports.getIDBrandRules = param('id')
    .isMongoId()
    .withMessage('Invalid Brand id format');


exports.deleteIDBrandRules = param('id')
    .isMongoId()
    .withMessage('Invalid Brand id format');

exports.createBrandRules = [
    check("name").notEmpty().withMessage('Brand required')
        .isLength({ min: 3 }).withMessage('Too short Brand name')
        .isLength({ max: 32 }).withMessage('Too long Brand name')
        .custom((value, { req }) =>
        {
            req.body.slug = slugify(value);
            return true;

        })
];

exports.updateBrandRules = [
    param('id')
        .isMongoId()
        .withMessage('Invalid Brand id format'),
    check("name").notEmpty().withMessage('Brand required')
        .isLength({ min: 3 }).withMessage('Too short Brand name')
        .isLength({ max: 32 }).withMessage('Too long Brand name')
        .custom((value, { req }) =>
        {
            req.body.slug = slugify(value);
            return true;

        })
];