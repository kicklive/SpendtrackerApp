var Budget = require('../models/budget.js');
var NewBudget = require('../models/newbudget.js');
var Transactions = require('../models/transactions.js');
var nb=null;

module.exports = function(app) {
    app.get("/data/budgetlist", function(req, res) {
        console.log('heree');
        Budget.find(function(err, ret) {
            if (err)
                res.send(err);
            res.json(ret);
        });
    });


    app.get("/data/getdetails/", function(req, res) {
        Budget.findOne({ _id: req.query.id }).populate('Transactions').exec(function(err, ret) {
            if (err)
                res.send(err);
            res.send(ret);
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
                BudgetAmount: req.body.budgetAmt,
                BudgetStatus: "Open",
                BudgetType: req.body.budgetCCType

            },
            function(err, newBudget) {
                if (err) {
                    res.send(err);
                }
                NewBudget.find(function(err, newBudgets) {
                    if (err) {
                        res.send(err);
                    }
                    nb=newBudgets;
                    res.json(newBudgets);
                });
            });
    });

    app.post("/data/SaveTransaction", function(req, res) {
        Transactions.create({
                itemdescription: req.body.itemDesc,
                itemprice: req.body.transAmt,
                transdate: req.body.transDate,
                store: req.body.store,
                upc: req.body.upc,
                BudgetId: req.body.budgetId
            },
            function(err, NewTrans) {
                if (err) {
                    res.send(err);
                }
                Transactions.find(function(err, NewTrans) {
                    if (err) {
                        res.send(err);
                    }
                    NewBudget.Transactions.push(NewTrans);
                    NewBudget.save(function(err, ret) {
                        if (err) {
                            res.send(err);
                        }
                    })
                    res.json(NewTrans);
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