var Budget = require('../models/budget.js');
var NewBudget = require('../models/newbudget.js');
var Transactions = require('../models/transactions.js');
var Product = require('../models/product.js');
var nodedate = require("node-datetime");

module.exports = function(app, config) {
    app.get("/data/budgetlist", function(req, res) {
        console.log('heree');
        ////debugger;
        Budget.find(function(err, ret) {
            if (err)
                res.send(err);
            ////debugger;
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
        ////debugger;
        var startDate = new Date(req.body.startdate);
        var endDate = new Date(req.body.enddate);
        var status;
        var today = new Date();
        if (startDate > today)
            status = 'Future';
        else
            status = 'Open';

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


    app.get('/data/Trends', function(req, res) {
        var maxCount = 0;
        var totalBudgeted = 0;
        var totalSpent = 0;
        console.log("here delete success?");

        Budget.aggregate([{
                $lookup: {
                    from: 'transactions',
                    localField: 'Transactions',
                    foreignField: '_id',
                    as: 'trans'
                }
            },
            {
                $facet: {
                    "Budgeted": [
                        { $group: { _id: null, total: { $sum: { $sum: '$BudgetAmount' } } } },
                        { $project: { '_id': 0, totalbudget: '$total' } }
                    ],
                    "Spent": [
                        { $unwind: '$trans' },
                        { $project: { '_id': 0, t: '$trans' } },
                        { $group: { _id: '$t.store', total: { $sum: { $sum: '$t.itemprice' } } } },
                        { $project: { '_id': 0, total: '$total' } },
                        { $group: { _id: null, totalspent: { $sum: { $sum: '$total' } } } },
                        { $project: { '_id': 0, totalspent: '$totalspent' } },
                    ],
                    "TopMonth": [
                        { $unwind: '$trans' },
                        { $project: { '_id': 0, t: '$trans' } },
                        { $group: { _id: { $month: '$t.transdate' }, total: { $sum: { $sum: '$t.itemprice' } } } },
                        { $project: { '_id': 0, 'month': '$_id', 'total': { $max: '$total' } } },
                        { $sort: { 'total': -1 } }
                    ],
                    "LowMonth": [
                        { $unwind: '$trans' },
                        { $project: { '_id': 0, t: '$trans' } },
                        { $group: { _id: { $month: '$t.transdate' }, total: { $sum: { $sum: '$t.itemprice' } } } },
                        { $project: { '_id': 0, 'month': '$_id', 'total': { $max: '$total' } } },
                        { $sort: { 'total': 1 } }
                    ],
                    "OverSpent": [
                        { $project: { '_id': 0, 'budgetamount': '$BudgetAmount', 'budgetstartdate': '$BudgetStartDate', 'budgetenddate': '$BudgetEndDate', 'totalspent': { $sum: '$trans.itemprice' } } },
                        { $project: { '_id': 0, 'budgetamount': '$budgetamount', 'budgetstartdate': '$budgetstartdate', 'budgetenddate': '$budgetenddate', 'ts': '$totalspent' } },
                        { $project: { '_id': 0, 'budgetamount': '$budgetamount', 'budgetstartdate': '$budgetstartdate', 'budgetenddate': '$budgetenddate', 'totalspent': '$ts', 'cmp': { $cmp: ['$ts', '$budgetamount'] } } },
                        { $match: { cmp: { $gt: 0 } } }
                    ],
                    "MostActivity": [
                        { $project: { '_id': 0, 'totalspent': '$trans.store' } },
                        { $unwind: '$totalspent' },
                        { $group: { _id: '$totalspent', count: { $sum: 1 } } },
                        {
                            $project: {
                                '_id': 0,
                                'store': '$_id',
                                'count': { $max: '$count' },
                            }
                        },
                        { $sort: { 'count': -1 } }
                    ],
                    "StoresVisited": [
                        { $project: { '_id': 0, 'totalspent': '$trans.store' } },
                        { $unwind: '$totalspent' },
                        { $group: { _id: '$totalspent', count: { $sum: 1 } } },
                        {
                            $project: {
                                '_id': 0,
                                'store': '$_id',
                            }
                        },
                    ],
                    "TopSpendingStore": [
                        { $project: { '_id': 0, 't': '$trans' } },
                        { $unwind: '$t' },
                        { $group: { _id: '$t.store', total: { $sum: '$t.itemprice' } } },
                        { $sort: { 'total': -1 } },
                        { $project: { '_id': 0, 'store': '$_id', 'totalspent': '$total' } },
                        { $limit: 1 }
                    ],
                    "SpendingByPaymentType": [
                        { $project: { '_id': '$_id', 'BudgetType': '$BudgetType', 't': '$trans' } },
                        { $unwind: '$t' },
                        { $group: { _id: '$BudgetType', total: { $sum: '$t.itemprice' } } },
                        { $project: { '_id': 0, 'BudgetType': '$_id', 'total': '$total' } },
                        { $sort: { 'total': -1 } },
                    ],
                    "AvgSpentPerStore": [
                        { $project: { '_id': 0, 't': '$trans' } },
                        { $unwind: '$t' },
                        { $group: { _id: '$t.store', total: { $sum: '$t.itemprice' }, visitsperstore: { $sum: 1 } } },
                        { $sort: { 'total': -1 } },
                        { $project: { '_id': 0, 'store': '$_id', 'totalspent': '$total', 'avgspentpervist': { $divide: ['$total', '$visitsperstore'] }, 'numvisits': '$visitsperstore' } },
                    ]
                }
            }
        ]).exec(function(err, ret) {
            if (err) {
                res.send(err);
            }
            res.json(ret);
        });
    })

    app.get("/partials/*", function(req, res) {
        console.log('here');
        res.render("../../public/app/templates/" + req.params[0]);
    });

    app.get('*', function(req, res) {
        //testing mongo, add mongoMessage
        res.render('index');
    });
};