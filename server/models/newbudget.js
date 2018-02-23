var mongoose = require("mongoose").set('debug', true);;
var Schema = mongoose.Schema;

var AddBudgetSchema = new Schema({
    BudgetStartDate: Date,
    BudgetEndDate: Date,
    BudgetAmount: Number,
    BudgetStatus: String
});
module.exports = mongoose.model("Budgets", AddBudgetSchema);