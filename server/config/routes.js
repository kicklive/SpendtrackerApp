var Budget = require('../models/budget.js');
var NewBudget = require('../models/newbudget.js');
var Transactions = require('../models/transactions.js');

module.exports = function(app, config) {
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


    app.post("/data/SaveBudget", function(req, res) {
        NewBudget.create({
                BudgetStartDate: req.body.startdate,
                BudgetEndDate: req.body.enddate,
                BudgetAmount: req.body.budgetamt,
                BudgetStatus: "Open",
                BudgetType: req.body.budgetType.selectedOption.id
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

    app.put("/data/updatetransaction", function(req, res) {
        console.log("updated id=" + req.body.transId)
        console.log("update field id=" + req.body.store)
        Transactions.findByIdAndUpdate(req.body.transId, {
            $set: {
                itemdescription: req.body.itemDesc,
                itemprice: req.body.transAmt,
                transdate: req.body.transDate,
                store: req.body.store,
                upc: req.body.upc
            }
        }, function(err, ret) {
            if (err) {
                res.send(err);
                console.log('err here')
            } else {
                res.send("success");
            }
            // console.log(ret);
        });

    });

    app.put("/data/updatestatus/:id", function(req, res) {
        console.log("heeeeeereeX-->" + req.params.id);
        NewBudget.findByIdAndUpdate(req.params.id, {
                $set: {
                    BudgetStatus: 'Closed'
                }
            }, {
                new: true
            },
            function(err, ret) {
                if (err) {
                    res.send(err);
                    console.log('err here')
                }
                res.send(ret);
            });

    });


    //have to set up static routing to our public directory for stylus config

    //catchall route
    // app.all('/*', function(req, res, next) {
    //     // Just send the index.html for other files to support HTML5Mode
    //     console.log("xx=" + config.rootPath)
    //     res.sendFile('index.jade', { root: config.rootPath + "/server/views/" });
    // });
    // app.all("/partials/*", function(req, res) {
    //     console.log('here');
    //     res.sendFile("../../public/app/templates/" + req.params[0]);
    // });


    app.get("/partials/*", function(req, res) {
        console.log('here');
        res.render("../../public/app/templates/" + req.params[0]);
    });

    app.get('*', function(req, res) {
        //testing mongo, add mongoMessage
        res.render('index');
    });
};