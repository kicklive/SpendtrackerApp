var mongoose = require("mongoose").set('debug', true);
var Schema = mongoose.Schema;

var AddProductSchema = new Schema({
    UPC: Number,
    ItemDescription: String
});
module.exports = mongoose.model("Product", AddProductSchema);