const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apifeatures");


exports.deleteAPI = (Model) => asyncHandler(async (req, res, next) =>
{
    const { id } = req.params;
    const category = await Model.findByIdAndRemove(id);

    if (!category)
    {
        return next(new ApiError(`No category for this id ${ id }`, 404));
    }
    res.status(201).json({ message: "delete successful...", data: category });

});

exports.updateAPI = (Model) => asyncHandler(async (req, res, next) =>
{
    const document = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true });
    if (!document)
    {
        return next(new ApiError(`No category for this id ${ req.params.id }`, 404));
    }
    res.status(200).json({ message: "updated sccessful", data: document });

});

exports.createAPI = (Model) => asyncHandler(async (req, res) =>
{
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });

});

exports.getByIdAPI = (Model) => asyncHandler(async (req, res, next) =>
{
    const { id } = req.params;
    const document = await Model.findById(id);
    if (!document)
    {
        return next(new ApiError(`No Brands for this id ${ id }`, 404));
    }
    res.status(200).json({ data: document });
});

exports.getAllAPI = (Model, modelName = " ") => asyncHandler(async (req, res) =>
{
    let filter = {};
    if (req.filterObj) (filter = req.filterObj);
    const documentCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
        .paginate(documentCounts)
        .filter()
        .search(modelName)
        .limitFields()
        .sort();
    //Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const listData = await mongooseQuery;
    res.status(200).json({ results: listData.length, paginationResult, data: listData });

});


