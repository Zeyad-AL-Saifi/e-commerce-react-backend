const express = require('express');
const { createBrands, deleteBrands, getAllBrands, getBrandByID, updateBrands, uploadBrandImage, resizeImage
} = require('../controllers/brandController');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { getIDBrandRules,
    createBrandRules,
    updateBrandRules,
    deleteIDBrandRules } = require('../validation/brandValidation');


const router = express.Router();

//get all brands
router.get('/', getAllBrands);


//get brands by id
router.get('/:id', getIDBrandRules, validationMiddleware, getBrandByID);


//add new brand
router.post('/', uploadBrandImage, resizeImage, createBrandRules, validationMiddleware, createBrands);



//add new brand
router.put('/:id', uploadBrandImage, resizeImage, updateBrandRules, validationMiddleware, updateBrands);



//add new brand
router.delete('/:id', deleteIDBrandRules, validationMiddleware, deleteBrands);



module.exports = router;