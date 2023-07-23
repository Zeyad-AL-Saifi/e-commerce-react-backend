const { check } = require('express-validator');
const { default: slugify } = require('slugify');
const UserModel = require('../models/userModel');

exports.signupRules = [
    check("name")
        .notEmpty()
        .withMessage('User required')
        .isLength({ min: 3 })
        .withMessage('Too short User name')
        .custom((value, { req }) =>
        {
            req.body.slug = slugify(value);
            return true;

        }),
    check('email')
        .notEmpty()
        .withMessage('email required')
        .isEmail()
        .withMessage("invalid email address")
        .custom((value) =>
            UserModel.findOne({ email: value }).then((user) =>
            { if (user) { return Promise.reject(new Error('E-mail already in user')); } })),
    check('passwordConfirm')
        .notEmpty()
        .withMessage('password confirm is required'),

    // }).withMessage('invalid email address'),
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password most be at least 8 characters")
        .custom((password, { req }) =>
        {
            if (password !== req.body.passwordConfirm)
            {
                throw new Error('password confirmation incorrect');
            }
            return true;
        })
];

exports.loginRules = [
    check('email')
        .notEmpty()
        .withMessage('email required')
        .isEmail()
        .withMessage("invalid email address"),
    check("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password most be at least 8 characters")
];
