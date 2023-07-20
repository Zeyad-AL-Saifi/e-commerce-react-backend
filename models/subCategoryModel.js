const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: [ true, "SubCategory must be unique" ],
            minlength: [ 2, "Too short SubCategory name" ],
            maxlength: [ 32, "Too long SubCategory name" ],
            required: [ true, "Sub category must have a valid name" ],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            required: [ true, "SubCategory must be belong to parent category" ],
        },
    },
    { timestamps: true }
);
const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategoryModel; 