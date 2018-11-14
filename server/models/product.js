var mongoose = require("mongoose").set('debug', true);
var Schema = mongoose.Schema;

var AddProductSchema = new Schema({
    UPC: Number,
    ItemDescription: String,
    Price: Number
});
module.exports = mongoose.model("Product", AddProductSchema);