const express = require('express');
const { signup
} = require('../controllers/authController');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { signupRules } = require('../validation/authValidation');


const router = express.Router();

//signup new users
router.post('/signup', signupRules, validationMiddleware, signup);



module.exports = router;