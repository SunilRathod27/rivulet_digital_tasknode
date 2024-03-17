const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    category : { type : Schema.Types.ObjectId, ref : 'Category', required : true },
    type : { type : String, required : true, unique : true }
});

module.exports = mongoose.model('SubCategory', subCategorySchema);