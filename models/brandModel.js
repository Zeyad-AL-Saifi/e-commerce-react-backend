const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Brand required' ],
        unique: [ true, 'Brand must be unique' ],
        minlength: [ 3, 'Too short Brand name' ],
        maxlength: [ 32, 'Too long Brand name' ]
    },
    //A and B ==>shoping.com/a-and-b
    //change all space to slash
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,


}, { timestamps: true });
const setImageURL = (doc) =>
{
    if (doc.image)
    {
        const imageUrl = `${ process.env.BASE_URL }/brands/${ doc.image }`;
        doc.image = imageUrl;
    }
};
// findOne, findAll and update
brandSchema.post('init', (doc) =>
{
    setImageURL(doc);
});

// create
brandSchema.post('save', (doc) =>
{
    setImageURL(doc);
});

const BrandsModel = mongoose.model('Brands', brandSchema);

module.exports = BrandsModel;