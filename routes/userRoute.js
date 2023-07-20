const express = require('express');
const { createUsers, deleteUsers, getAllUsers, getUserByID, updateUsers, uploadUserImage, resizeImage
} = require('../controllers/userController');
// const { validationMiddleware } = require('../middlewares/validationMiddleware');
// const { getIDBrandRules,
//     createBrandRules,
//     updateBrandRules,
//     deleteIDBrandRules } = require('../validation/brandValidation');


const router = express.Router();

//get all users
router.get('/', getAllUsers);


//get users by id
router.get('/:id', getUserByID);


//add new users
router.post('/', uploadUserImage, resizeImage, createUsers);



//add new users
router.put('/:id', uploadUserImage, resizeImage, updateUsers);



//add new users
router.delete('/:id', deleteUsers);



module.exports = router;