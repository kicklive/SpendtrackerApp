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


    app.get("/data/getdetails/", function(req, res) {
        Budget.findOne({
            _id: req.query.id
        }).populate('Transactions').exec(function(err, ret) {
            if (err)
                res.send(err);
            res.send(ret);
        });
    });
    app.get("/data/gettrandetails/", function(req, res) {
        console.log(req.query.id)
        Transactions.findOne({
            _id: req.query.id
        }, function(err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
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
                    res.json(newBudgets);
                });
            });
    });

    app.post("/data/SaveTransaction", function(req, res) {
        var xx = null;
        console.log('dfsddas');
        Transactions.create({
                itemdescription: req.body.itemDesc,
                itemprice: req.body.transAmt,
                transdate: req.body.transDate,
                store: req.body.store,
                upc: req.body.upc
                    //BudgetId: req.body.budgetId
            },
            function(err, NewTrans) {
                if (err) {
                    res.send(err);
                }
                console.log(NewBudget);
                NewBudget.findOne({
                        _id: req.body.budgetId
                    },
                    function(err, ret) {
                        //console.log('HEEEERREE');
                        ret.Transactions.push(NewTrans);
                        ret.save(function(err, ret) {
                            if (err) {
                                res.send(err);
                                console.log('err here')
                            }
                        });
                    }
                );
                res.json(NewTrans);
            });
    });

    app.put("/data/updatestatus/", function(req, res) {
        NewBudget.update({
            _id: req.query.id
        }, {
            $set: {
                BudgetStatus: 'Closed'
            }
        }, function(err, ret) {
            if (err) {
                res.send(err);
                console.log('err here')
            }
            console.log(ret);
        });

    });

    //have to set up static routing to our public directory for stylus config

    //catchall route
    app.get('*', function(req, res) {
        //testing mongo, add mongoMessage
        res.render('index');
    });
};