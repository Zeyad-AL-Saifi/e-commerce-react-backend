const express = require('express');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { getIDSubCategoryRules, createSubCategoryRules, updateSubCategoryRules, deleteIDSubCategoryRules } = require('../validation/subcategoryValidation');
const { createFilterObj, setCategoryIdToBody, createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryByID, updateSubCategory } = require('../controllers/subCategoryController');
const { uploadCategoryImage } = require('../controllers/categoryController');


//mergeParams: true ==>to access route or params belong to another resorses
//like we need to access categoryId from category router
const router = express.Router({ mergeParams: true });

//get all categories
router.get('/', createFilterObj, getAllSubCategories);


//get categories by id
router.get('/:id', getIDSubCategoryRules, validationMiddleware, getSubCategoryByID);


//add new category
router.post('/', setCategoryIdToBody, createSubCategoryRules, validationMiddleware, createSubCategory);



//add new category
router.put('/:id', updateSubCategoryRules, validationMiddleware, updateSubCategory);



//add new category
router.delete('/:id', deleteIDSubCategoryRules, validationMiddleware, deleteSubCategory);



module.exports = router;