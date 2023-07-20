const express = require('express');
const {
    createProduct, deleteProduct, getAllProducts, getProductByID
    , updateProduct
} = require('../controllers/productController');
const { validationMiddleware } = require('../middlewares/validationMiddleware');

const { createProductValidation, deleteProductValidation, getProductValidation, updateProductValidation
} = require('../validation/productValidation');

const router = express.Router();

//get all categories
router.get('/', getAllProducts);


//get categories by id
router.get('/:id', getProductValidation, validationMiddleware, getProductByID);




//add new category
router.post('/', createProductValidation, validationMiddleware, createProduct);



//add new category
router.put('/:id', updateProductValidation, validationMiddleware, updateProduct);



//add new category
router.delete('/:id', deleteProductValidation, validationMiddleware, deleteProduct);



module.exports = router;