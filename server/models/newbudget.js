var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AddBudgetSchema = new Schema({
    BudgetStartDate: Date,
    BudgetEndDate: Date,
    BudgetAmount: Number
});
module.exports = mongoose.model("Budgets", AddBudgetSchema);