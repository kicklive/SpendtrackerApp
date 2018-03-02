var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    transdate: Date,
    store: String,
    upc: Number,
    itemprice: Number,
    itemdescription: String,
    BudgetId: { type: Schema.ObjectId, ref: "Budgets" }
});
module.exports = mongoose.model("Transaction", TransactionSchema);