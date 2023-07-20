const express = require('express');
const { createBrands, deleteBrands, getAllBrands, getBrandByID, updateBrands
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
router.post('/', createBrandRules, validationMiddleware, createBrands);



//add new brand
router.put('/:id', updateBrandRules, validationMiddleware, updateBrands);



//add new brand
router.delete('/:id', deleteIDBrandRules, validationMiddleware, deleteBrands);



module.exports = router;