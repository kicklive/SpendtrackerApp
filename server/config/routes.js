var Budget = require('../models/budget.js');
var NewBudget = require('../models/newbudget.js');
var Transactions = require('../models/transactions.js');

module.exports = function(app) {
    app.get("/data/budgetlist", function(req, res) {
        console.log('heree');
        Budget.find(function(err, ret) {
            if (err)
                res.send(err);
            res.json(ret);
        });
    });
    app.get("/partials/*", function(req, res) {
        console.log('here');
        res.render("../../public/app/templates/" + req.params[0]);
    });

    app.post("/data/SaveBudget", function(req, res) {
        NewBudget.create({
                BudgetStartDate: req.body.startDate,
                BudgetEndDate: req.body.endDate,
                BudgetAmount: req.body.budgetAmt
            },
            function(err, newBudget) {
                if (err) {
                    res.send(err);
                }
                NewBudget.find(function(err, newBudgets) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(newBudgets);
                });
            });
    });

    //have to set up static routing to our public directory for stylus config

    //catchall route
    app.get('*', function(req, res) {
        //testing mongo, add mongoMessage
        res.render('index');
    });
};