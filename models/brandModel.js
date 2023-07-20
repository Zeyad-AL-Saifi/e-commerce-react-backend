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


const BrandsModel = mongoose.model('Brands', brandSchema);

module.exports = BrandsModel;