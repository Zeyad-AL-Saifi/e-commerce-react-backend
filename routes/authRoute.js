const express = require('express');
const { signup, login } = require('../controllers/authController');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { signupRules, loginRules } = require('../validation/authValidation');


const router = express.Router();

//signup new users
router.post('/signup', signupRules, validationMiddleware, signup);


//login 
router.post('/login', loginRules, validationMiddleware, login);



module.exports = router;