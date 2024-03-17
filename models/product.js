const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category : { type : Schema.Types.ObjectId, ref : 'Category', required : true },
    name : String,
    description : String,
    photo : String,
    price : Number,
    stockQty : Number
});

module.exports = mongoose.model('Product', productSchema);