const SubCategoryModel = require('../models/subCategoryModel');
const Factory = require('../Api/ApiControllerFactory');

exports.setCategoryIdToBody = (req, res, next) =>
{
    if (!req.body.category)
    {
        req.body.category = req.params.categoryId;

    };
    next();
};
//nested route

exports.createFilterObj = (req, res, next) =>
{
    let filterObjct = {};
    if (req.params.categoryId)
    {
        filterObjct = { category: req.params.categoryId };

    } req.filterObjct = filterObjct;
    next();
};
/**
 * @desc Get all Subcategories belong to category id
 * @route /api/v1/category/:categoryId/subcategories
 * @method GET
 * @access public
 */
exports.getAllSubCategories = Factory.getAllAPI(SubCategoryModel);

/**
 * @desc Get specific subcategories
 * @route /api/v1/subcategories/:id
 * @method GET
 * @access public
 */
exports.getSubCategoryByID = Factory.getByIdAPI(SubCategoryModel);




/**
 * @desc create Subcategory
 * @route /api/v1/subcategories
 * @method POST
 * @access private
 */
exports.createSubCategory = Factory.createAPI(SubCategoryModel);





/**
 * @desc update subcategory
 * @route /api/v1/subcategories/:id
 * @method PUT
 * @access private
 */

exports.updateSubCategory = Factory.updateAPI(SubCategoryModel);




/**
 * @desc delete subCategory
 * @route /api/v1/subcategories/:id
 * @method DELETE
 * @access private
 */
exports.deleteSubCategory = Factory.deleteAPI(SubCategoryModel);