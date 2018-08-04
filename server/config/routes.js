var Budget = require('../models/budget.js');
var NewBudget = require('../models/newbudget.js');
var Transactions = require('../models/transactions.js');
var Product = require('../models/product.js');
var nodedate = require("node-datetime");

module.exports = function(app, config) {
    app.get("/data/budgetlist", function(req, res) {
        console.log('heree');
        //debugger;
        Budget.find(function(err, ret) {
            if (err)
                res.send(err);
            //debugger;
            res.send(ret);
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
        //debugger;
        var startDate = new Date(req.body.startdate);
        var endDate = new Date(req.body.enddate);
        var status;
        var today = new Date();
        if (startDate > today)
            status = 'Future';
        else
            status = 'Open';
        //startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
        //endDate.setMinutes(endDate.getMinutes() - endDate.getTimezoneOffset());

        // var startYear=startDate.getFullYear;
        // var startDate=startDate.getDate;
        // var startMonth=startDate.getMonth;

        // startDate = startDate.getFullYear().toString() + '-' + (startDate.getMonth() + 1).toString() + '-' + (startDate.getDate() + 1).toString();
        // endDate = endDate.getFullYear().toString() + '-' + (endDate.getMonth() + 1).toString() + '-' + (endDate.getDate() + 1).toString();
        // startDate = nodedate.create(startDate);
        // endDate = nodedate.create(endDate);


        // startDate = startDate.setHours(0, 0, 0, 0);
        // endDate = endDate.setHours(0, 0, 0, 0);

        // startDate = startDate.toISOString().slice(0, 10);
        // endDate = endDate.toISOString().slice(0, 10);
        console.log('startDate==>' + req.body.startdate);
        console.log('startDatex==>' + startDate);

        NewBudget.create({
                BudgetStartDate: startDate,
                BudgetEndDate: endDate,
                BudgetAmount: req.body.budgetamt,
                BudgetStatus: status,
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
                SaveItem(req.body.upc, req.body.itemDesc);
                res.json(NewTrans);
            });
    });

    // app.post("/data/SaveTransaction", function(req, res) {
    //     console.log('dfsddas');
    //     Transactions.create({
    //             itemdescription: req.body.itemDesc,
    //             itemprice: req.body.transAmt,
    //             transdate: req.body.transDate,
    //             store: req.body.store,
    //             upc: req.body.upc
    //                 //BudgetId: req.body.budgetId
    //         },
    //         function(err, NewTrans) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 console.log("nb==>" + NewBudget);
    //                 SaveItem(req.body.upc, req.body.itemDesc);
    //                 NewBudget.findOne({
    //                         _id: req.body.budgetId
    //                     },
    //                     function(err, ret) {
    //                         //console.log('HEEEERREE');
    //                         ret.Transactions.push(NewTrans);
    //                         ret.save(function(err, ret) {
    //                             if (err) {
    //                                 res.send(err);
    //                                 console.log('err here')
    //                             }
    //                         });
    //                     }
    //                 );
    //                 res.json(NewTrans);
    //             }
    //         });
    // });

    function SaveItem(upc, desc) {
        console.log("upc==>" + upc);
        Product.findOne({
            upc: upc
        }, function(err, ret) {
            if (err) {
                res.send(err)
            } else {
                console.log("ret==>" + ret)
                Product.create({
                    itemdescription: desc,
                    upc: upc
                }, function(itemSaveErr, itemRet) {
                    if (itemSaveErr)
                        res.send("There was a problem saving the item.");
                });
            }
        });
    }

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

    app.put("/data/updatestatusall/", function(req, res) {
        var bulk = NewBudget.collection.initializeOrderedBulkOp();
        console.log("bulk==>" + bulk);
        var todaysDate = new Date();

        //var dt = nodedate.create()
        // var formattedDate = dt.format('m/d/Y')
        // var dateOnly = new Date(dateOnly.setHours(0, 0, 0, 0));

        //bulk.find({ 'BudgetAmount': { $lt: dt.getTime() } }).update({
        bulk.find({ 'BudgetEndDate': { $lt: todaysDate } }).update({
            $set: {
                BudgetStatus: 'Closed'
            }
        });
        bulk.find({ 'BudgetStartDate': { $lte: todaysDate }, 'BudgetStatus': 'Future' }).update({
            $set: {
                BudgetStatus: 'Open'
            }
        });
        bulk.execute(function(err, ret) {
            if (err) {
                console.log("bulk err==>" + err);
                //res.send(err);
                console.log('err in bulk update')
            } else {
                res.send("success");
            }
        });
    });

    app.get("/data/deletetransaction", function(req, res) {
        console.log("In deletetrans")
        Transactions.findByIdAndRemove({
            _id: req.query.id
        }, function(err, ret) {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                console.log("here delete success?");
                res.send("success");
            }
        });
    })

    app.get("/data/itemsearch", function(req, res) {
        console.log(req.query.id)
        Transactions.findOne({
            upc: req.query.id
        }, function(err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    });
    app.get('/data/AllHistory', function(req, res) {
        Transactions.find({}).sort({ transdate: -1, upc: 1, store: 1 }).exec(function(err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        })
    });

    app.get('/data/HistoryByDateRange', function(req, res) {
        console.log('sd==>' + req.query.startdate)
            //  console.log('new sd==>' + new Date(req.query.startdate))
        Transactions.find({
            transdate: {
                $gte: new Date(req.query.startdate).toISOString(),
                $lte: new Date(req.query.enddate).toISOString()
            }
        }).sort({ transdate: -1, upc: 1, store: 1 }).exec(function(err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    });
    app.get('/data/HistoryByUPC', function(req, res) {
        Transactions.find({
            upc: req.query.upc
        }).sort({ transdate: -1, upc: 1, store: 1 }).exec(function(err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
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