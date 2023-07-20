const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [ 3, 'Too short product title' ],
        maxlength: [ 100, 'Too long product title' ],

    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [ true, "product description is required" ],
        minlength: [ 20, 'Too short product description' ],
    },
    quantity: {
        type: Number,
        required: [ true, 'Product quntity is required' ],
    },
    sold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [ true, "product price is required" ],
        trim: true,
        max: [ 999999, 'Too long product price' ]
    },
    priceAfterDescount: {
        type: Number,
    },
    colors: [ String ],

    imageCover: {
        type: String,
        required: [ true, 'product image cover is required' ]
    },
    images: [ String ],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [ true, 'product most be belong to category' ]

    },
    subCategory: [ {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
    } ],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: "Brands",
    },
    rate: {
        type: Number,
        min: [ 1, "Rating most be above or equal 1.0" ],
        max: [ 5, "Rating most be below or equal 5.0" ]
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
}
);

//Mongoose query middilwere
productSchema.pre(/^find/, function (next)
{
    this.populate({
        path: 'category',
        select: 'name',
    });
    next();
});

const setImageURL = (doc) =>
{
    if (doc.imageCover)
    {
        const imageUrl = `${ process.env.BASE_URL }/products/${ doc.imageCover }`;
        doc.imageCover = imageUrl;
    }
    if (doc.images)
    {
        const imagesList = [];
        doc.images.forEach((image) =>
        {
            const imageUrl = `${ process.env.BASE_URL }/products/${ image }`;
            imagesList.push(imageUrl);
        });
        doc.images = imagesList;
    }
};
// findOne, findAll and update
productSchema.post('init', (doc) =>
{
    setImageURL(doc);
});

// create
productSchema.post('save', (doc) =>
{
    setImageURL(doc);
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;