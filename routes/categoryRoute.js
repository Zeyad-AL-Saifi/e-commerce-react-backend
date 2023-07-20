const express = require('express');
const { createCategory, getAllCategories, getCategoryByID, updateCategory, deleteCategory, uploadCategoryImage, resizeImage } = require('../controllers/categoryController');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { getIDCategoryRules, createCategoryRules, updateCategoryRules, deleteIDCategoryRules } = require('../validation/categoryValidation');
const createSubCategoryRoute = require('./subCategoryRoute');

const router = express.Router();

//get all categories
router.get('/', getAllCategories);


//get categories by id
router.get('/:id', getIDCategoryRules, validationMiddleware, getCategoryByID);


//any think  come from this route(/:categoryId/subcategories) get this and go to the sub category route
router.use('/:categoryId/subcategories', createSubCategoryRoute);


//add new category
router.post('/', uploadCategoryImage, resizeImage, createCategoryRules, validationMiddleware, createCategory);



//add new category
router.put('/:id', uploadCategoryImage, resizeImage, updateCategoryRules, validationMiddleware, updateCategory);



//add new category
router.delete('/:id', deleteIDCategoryRules, validationMiddleware, deleteCategory);



module.exports = router;