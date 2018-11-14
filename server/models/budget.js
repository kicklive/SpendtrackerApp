var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BudgetSchema = new Schema({
    BudgetAmount: Number,
    ActualAmount: Number,
    BudgetDuration: Number,
    BudgetType: String,
    WeekOf: String,
    Transactions: [{ type: Schema.ObjectId, ref: "Transaction" }]
});
module.exports = mongoose.model("Budget", BudgetSchema);