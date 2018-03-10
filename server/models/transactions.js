var mongoose = require("mongoose").set('debug', true);
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    transdate: Date,
    store: String,
    upc: Number,
    itemprice: Number,
    itemdescription: String,
});
module.exports = mongoose.model("Transaction", TransactionSchema);