const express = require('express');
const { createUsers, deleteUsers, getAllUsers, getUserByID, updateUsers, uploadUserImage, resizeImage
} = require('../controllers/userController');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { getIDUserRules,
    createUserRules,
    updateUserRules,
    deleteIDUserRules } = require('../validation/userValidation');


const router = express.Router();

//get all users
router.get('/', getAllUsers);


//get users by id
router.get('/:id', getIDUserRules, validationMiddleware, getUserByID);


//add new users
router.post('/', uploadUserImage, resizeImage, createUserRules, validationMiddleware, createUsers);



//add new users
router.put('/:id', uploadUserImage, resizeImage, updateUserRules, validationMiddleware, updateUsers);



//add new users
router.delete('/:id', deleteIDUserRules, validationMiddleware, deleteUsers);



module.exports = router;