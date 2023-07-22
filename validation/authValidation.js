const { param, check, body } = require('express-validator');
const bcrypt = require('bcryptjs');
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

exports.updateUserRules = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User id format'),
    check('email')
        .optional()
        .isEmail().withMessage("invalid email address"),
    check("password").optional()
        .isLength({ min: 8 }).withMessage("password most be at least 8 characters"),
    check('image').optional(),
    check('role').optional(),
    check('phone').optional().isMobilePhone([ "ar-JO,ar-Eg" ])
];
exports.getIDUserRules = [
    param('id')
        .isMongoId()
        .withMessage('Invalid User id format'),
];


exports.deleteIDUserRules = [
    //param  check if field in param and body the same thing but check if exist in body 
    //but th check() check if field exist in param or body 

    param('id')
        .isMongoId()
        .withMessage('Invalid User id format'),
    param('id')
        .isMongoId()
        .withMessage('Invalid User id format'),
    body("name")
        .optional()
        .custom((value, { req }) =>
        {
            req.body.slug = slugify(value);
            return true;

        }) ];


exports.changeUserPasswordRules = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User id format'),
    check("currentPassword")
        .notEmpty()
        .withMessage("you must enter your current password"),
    check("passwordConfirm")
        .notEmpty()
        .withMessage('you must enter the password confirm'),
    check("password")
        .notEmpty()
        .withMessage('you must enter the new password')
        .custom(async (value, { req }) => 
        {
            //1) verify current password
            const user = await UserModel.findById(req.params.id);
            if (!user)
            {
                throw new Error('There is no user for this id');
            }
            const isCorrectPassword = await bcrypt.compare(
                req.body.currentPassword
                , user.password
            );
            if (!isCorrectPassword)
            {
                throw new Error('Incorrect current password');
            }

            //2)check password confirm
            if (value !== req.body.passwordConfirm)
            {
                throw new Error('password confirmation incorrect');
            }


            //3)check if new password is the same old password        
            if (req.body.currentPassword === value)
            {
                throw new Error('the new password is the same password you have');
            }


            return true;



        })
    ,

];