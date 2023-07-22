const express = require('express');
const { createUsers, updatePassword, deleteUsers, getAllUsers, getUserByID, updateUsers, uploadUserImage, resizeImage
} = require('../controllers/userController');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { getIDUserRules,
    createUserRules,
    updateUserRules,
    deleteIDUserRules,
    changeUserPasswordRules } = require('../validation/userValidation');


const router = express.Router();

//get all users
router.get('/', getAllUsers);


//get users by id
router.get('/:id', getIDUserRules, validationMiddleware, getUserByID);


//add new users
router.post('/', uploadUserImage, resizeImage, createUserRules, validationMiddleware, createUsers);



//add new users
router.put('/:id', uploadUserImage, resizeImage, updateUserRules, validationMiddleware, updateUsers);
router.put("/changePassword/:id", changeUserPasswordRules, validationMiddleware, updatePassword);



//add new users
router.delete('/:id', deleteIDUserRules, validationMiddleware, deleteUsers);



module.exports = router;