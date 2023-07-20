// const slugify = require('slugify');
// const asyncHandler = require('express-async-handler');
// const productModel = require('../models/productModel');
// const ApiError = require('../utils/apiError');

// /**
//  * @desc Get all products
//  * @route /api/v1/products
//  * @method GET
//  * @access public
//  */
// exports.getAllProducts = asyncHandler(async (req, res) =>
// {
//     // eslint-disable-next-line node/no-unsupported-features/es-syntax
//     const queryString = { ...req.query };
//     const excludesFields = [ "page", "sort", 'limit', 'fields' ];
//     excludesFields.forEach((field) => delete queryString[ field ]);


//     let querySt = JSON.stringify(queryString);
//     querySt = querySt.replace(/\b(gte|ge|lte|lt)\b/g, match => `$${ match }`);


//     const page = req.query.page || 1;
//     const limit = req.query.limit || 50;
//     const skip = (page - 1) * limit;
//     //you can use this way to make a query
//     //.where('price').equals(req.query.price)
//     //or this
//     // {
//     //     price: req.query.price,
//     //     rate: req.query.rate,
//     //inside the find as object
//     // }
//     //or we can put the req.query direct
//     let mongooseQuery = productModel.find(JSON.parse(querySt))
//         .skip(skip)
//         .limit(limit)
//         .populate({ path: 'category', select: 'name' });


//     //sort
//     if (req.query.sort)//in query you can add - to sort desending
//     {
//         const sortBy = req.query.sort.split(',').join(' ');
//         mongooseQuery = mongooseQuery.sort(sortBy);
//     } else
//     {
//         mongooseQuery = mongooseQuery.sort("-createAt");

//     }

//     //return fields
//     if (req.query.fields)
//     {
//         const fields = req.query.fields.split(',').join(' ');
//         mongooseQuery.mongooseQuery.select(fields);
//     }
//     //search
//     if (req.query.keyword)
//     {
//         const query = {};

//         query.$or = [
//             { title: { $regex: req.query.keyword, $option: "i" } },//$option: "i" to do it no case senstive A,a
//             { description: { $regex: req.query.keyword, $option: "i" }, }
//         ];
//         mongooseQuery = mongooseQuery.find(query);
//     }

//     const listData = await mongooseQuery;
//     res.status(200).json({ result: listData.length, page, data: listData });
// });

// /**
//  * @desc Get specific product
//  * @route /api/v1/products/:id
//  * @method GET
//  * @access public
//  */
// exports.getProductByID = asyncHandler(async (req, res, next) =>
// {
//     const { id } = req.params;
//     const product = await productModel.findById(id).populate({ path: 'category', select: 'name' });
//     if (!product)
//     {
//         return next(new ApiError(`No category for this id ${ id }`, 404));
//     }
//     res.status(200).json({ data: product });
// });


// /**
//  * @desc create product
//  * @route /api/v1/products
//  * @method POST
//  * @access private
//  */
// exports.createProduct = asyncHandler(async (req, res) =>
// {
//     req.body.slug = slugify(req.body.title);
//     const product = await productModel.create(req.body);
//     res.status(201).json({ data: product });

// });



// /**
//  * @desc update category
//  * @route /api/v1/products/:id
//  * @method PUT
//  * @access private
//  */
// exports.updateProduct = asyncHandler(async (req, res, next) =>
// {
//     const { id } = req.params;
//     if (req.body.title)
//     {
//         req.body.slug = slugify(req.body.title);
//     }


//     const product = await productModel.findByIdAndUpdate(id,
//         req.body,
//         { new: true });
//     if (!product)
//     {
//         return next(new ApiError(`No Product for this id ${ id }`, 404));
//     }
//     res.status(200).json({ message: "updated sccessful", data: product });

// });




// /**
//  * @desc delete product
//  * @route /api/v1/products/:id
//  * @method DELETE
//  * @access private
//  */
// exports.deleteProduct = asyncHandler(async (req, res, next) =>
// {
//     const { id } = req.params;
//     const product = await productModel.findByIdAndRemove(id);

//     if (!product)
//     {
//         return next(new ApiError(`No product for this id ${ id }`, 404));
//     }
//     res.status(201).json({ message: "delete successful...", data: product });

// });


