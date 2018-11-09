// var Budget = require('../models/budget.js');
// var NewBudget = require('../models/newbudget.js');
var Budget = require('../models/newbudget.js');
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


    app.get("/data/getdetails/", function(req, res, next) {
        console.log("getdetails==>" + req.query.id)
        Budget.findOne({
            _id: req.query.id
        }).populate('Transactions').exec(function(err, ret) {
            if (err) {
                console.log("saved==>" + err.message)
                return next();
            }
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

        console.log('startDate==>' + req.body.startdate);
        console.log('startDatex==>' + startDate);

        Budget.create({
                BudgetStartDate: startDate,
                BudgetEndDate: endDate,
                BudgetAmount: req.body.budgetamt,
                BudgetStatus: status,
                BudgetType: req.body.budgetType.selectedOption.id
            },
            function(err, budget) {
                if (err) {
                    res.send(err);
                }
                Budget.find(function(err, budgets) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(budgets);
                });
            });
    });

    app.post("/data/SaveTransaction", function(req, res, next) {
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
                console.log(Budget);
                Budget.findOne({
                        _id: req.body.budgetId
                    },
                    function(err, ret) {
                        console.log('HEEEERREE========>' + req.body.itemDesc);
                        console.log('HEEEERREE========>' + NewTrans.upc);
                        ret.Transactions.push(NewTrans);
                        ret.save(function(err, ret) {
                            if (err) {
                                return next(err);
                                console.log('err here')
                            }
                            var prod = new Product({
                                ItemDescription: req.body.itemDesc,
                                UPC: req.body.upc,
                                Price: req.body.transAmt
                            });
                            prod.save(function(prodSaveErr, ret) {
                                if (prodSaveErr) {
                                    console.log("saved==>" + prodSaveErr)
                                    return next(prodSaveErr);
                                }
                                res.send('success');
                            });




                            // saveRet = SaveItem(req.body.upc, req.body.itemDesc, req.body.transAmt);
                            // if (saveRet == 'success')
                            //     res.json(NewTrans);
                            // else
                            //     res.send(saveRet);
                        });
                    }
                );

            });
    });

    app.post("/data/addproduct", function(req, res, next) {
        var id;
        Product.findOne({
            UPC: req.body.UPC
        }, function(err, ret) {
            if (err)
                return next();
            else {
                if (ret != null)
                    id = ret._id;
                var prod = new Product({
                    _id: id,
                    ItemDescription: req.body.ItemDescription,
                    UPC: req.body.UPC,
                    Price: req.body.Price
                });
                prod.save(function(err, ret) {
                    if (err) {
                        console.log("saved==>" + err)
                        return next(err);
                    }
                    res.send('ssuccess');
                });
            }


        });



        // var saveRet = SaveItem(req.body.UPC, req.body.ItemDescription, req.body.Price, next);
        // console.log("saveRet==>" + saveRet)
        // res.send(saveRet);
    });


    // function SaveItem(upc, desc, price, next) {
    //     console.log("upc==>" + upc);
    //     console.log("desc==>" + desc);
    //     console.log("price==>" + price);
    //     var id;
    //     Product.findOne({
    //         UPC: upc
    //     }, function(err, ret) {
    //         if (err) {
    //             return next();
    //         } else {
    //             console.log("ret saveItem==>" + ret)
    //             if (ret == null) {
    //                 // id = ret._id;
    //                 console.log("in Product.save()==>" + upc);
    //                 console.log("price==>" + price);
    //                 prod = new Product({

    //                     ItemDescription: desc,
    //                     UPC: upc,
    //                     Price: price
    //                 });
    //                 prod.save(function(err, ret) {
    //                     if (err) {
    //                         console.log("saved==>" + err)
    //                         return next();
    //                     }
    //                     return 'success';
    //                 });
    //             }
    //         }
    //     });

    // }

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
        Budget.findByIdAndUpdate(req.params.id, {
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
        var bulk = Budget.collection.initializeOrderedBulkOp();
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

    app.get("/data/deletetransaction", function(req, res, next) {
        console.log("In deletetrans")
        Transactions.findByIdAndRemove({
            _id: req.query.id
        }, function(err, ret) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log("here delete success?");
            res.send("success");
        });
    })


    app.get("/data/itemsearch", function(req, res, next) {
        console.log(req.query.id)
        Product.findOne({
            UPC: req.query.id
        }, function(err, data) {
            if (err) {
                console.log('error===>' + err.message)
                err.httpStatusCode = 500; //change to another number
                return next(err);
            }
            res.json(data);
        });
    });
    app.get("/data/searchallitems", function(req, res) {
        console.log(req.query.id)
        Product.find({}, function(err, data) {
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

    app.get('/data/itemsearchbyid', function(req, res, next) {
        console.log("productID==>" + req.query.id)
        Product.find({
            _id: req.query.id
        }).exec(function(err, data) {
            if (err) {
                return next(err);
            }
            res.json(data[0]);
        });
    });

    app.get("/data/deleteproduct", function(req, res, next) {
        console.log("In deleteproduct")
        Product.findByIdAndRemove({
            _id: req.query.id
        }, function(err, ret) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.send("success");

        });
    })

    app.put("/data/updateproduct", function(req, res, next) {
        console.log("In updateproduct");
        Product.findByIdAndUpdate(req.body.id, {
            $set: {
                ItemDescription: req.body.ItemDescription,
                Price: req.body.Price
            }
        }, {
            new: true
        }, function(err, ret) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.send("success");
        });
    })


    app.put("/data/updatestatus/:id", function(req, res) {
        console.log("heeeeeereeX-->" + req.params.id);
        Budget.findByIdAndUpdate(req.params.id, {
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
    });

    app.get('/data/TrendsByMonth', function(req, res) {
        var maxCount = 0;
        var totalBudgeted = 0;
        var totalSpent = 0;
        var m = req.query.m;
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
                    "Budgeted": [{
                            $project: {
                                '_id': 0,
                                start: '$BudgetStartDate',
                                end: '$BudgetEndDate',
                                amount: '$BudgetAmount',
                                status: '$BudgetStatus',
                                'type': '$BudgetType',
                                daysinbudget: { $divide: [{ $subtract: ['$BudgetEndDate', '$BudgetStartDate'] }, { $multiply: [24, 60, 60, 1000] }] },
                                startmonth: { $month: '$BudgetStartDate' },
                                endmonth: { $month: '$BudgetEndDate' },
                                yr: { $year: '$BudgetStartDate' },
                                trans: '$trans'
                            },
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                end: '$end',
                                amount: '$amount',
                                status: '$status',
                                type: '$type',
                                daysinbudget: '$daysinbudget',
                                startmonth: { $toString: '$startmonth' },
                                endmonth: { $toString: '$endmonth' },
                                yr: { $toString: '$yr' },
                                trans: '$trans'
                            }
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                end: '$end',
                                amount: '$amount',
                                status: '$status',
                                type: '$type',
                                daysinbudget: '$daysinbudget',
                                startmonth: '$startmonth',
                                endmonth: '$endmonth',
                                yr: '$yr',
                                trans: '$trans'
                            }
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                end: '$end',
                                amount: '$amount',
                                status: '$status',
                                type: '$type',
                                daysinbudget: '$daysinbudget',
                                startmonth: '$startmonth',
                                endmonth: '$endmonth',
                                yr: '$yr',
                                eomenddate: { $toDate: { $concat: ['$endmonth', '/1/', '$yr'] } },
                                eomstartdate: { $toDate: { $concat: ['$startmonth', '/1/', '$yr'] } },
                                trans: '$trans'
                            }
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                end: '$end',
                                amount: '$amount',
                                status: '$status',
                                type: '$type',
                                daysinbudget: '$daysinbudget',
                                startmonth: '$startmonth',
                                endmonth: '$endmonth',
                                yr: '$yr',
                                eomenddate: '$eomenddate',
                                eomstartdate: '$eomstartdate',
                                eomdate: { $toString: { $divide: [{ $subtract: ['$eomenddate', '$eomstartdate'] }, { $multiply: [24, 60, 60, 1000] }] } },
                                trans: '$trans'
                            }
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                end: '$end',
                                amount: '$amount',
                                status: '$status',
                                type: '$type',
                                daysinbudget: '$daysinbudget',
                                startmonth: '$startmonth',
                                endmonth: '$endmonth',
                                yr: '$yr',
                                eomenddate: '$eomenddate',
                                eomstartdate: '$eomstartdate',
                                eomday: '$eomdate',
                                trans: '$trans'
                            }
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                amount: '$amount',
                                status: '$status',
                                type: '$type',
                                daysinbudget: '$daysinbudget',
                                startmonth: '$startmonth',
                                endmonth: '$endmonth',
                                yr: '$yr',
                                eomenddate: '$eomenddate',
                                eomstartdate: '$eomstartdate',
                                eomday: '$eomdate',
                                trans: '$trans',
                                end: {
                                    $cond: {
                                        if: {
                                            $ne: ['$eomday', '0']
                                        },
                                        then: { $toDate: { $concat: ['$startmonth', '/', '$eomday', '/', '$yr', ' 04:00:00'] } },
                                        else: '$end'
                                    }
                                }


                            }
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                end: '$end',
                                amount: '$amount',
                                status: '$status',
                                type: '$type',
                                daysinbudget: { $divide: [{ $subtract: ['$end', '$start'] }, { $multiply: [24, 60, 60, 1000] }] },
                                originaldaysinbudget: '$daysinbudget',
                                endmonth: '$endmonth',
                                startmonth: '$startmonth'
                            }
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                end: '$end',
                                status: '$status',
                                type: '$type',
                                daysinbudget: '$daysinbudget',
                                originaldaysinbudget: '$originaldaysinbudget',
                                amount: { $multiply: [{ $divide: ['$amount', '$originaldaysinbudget'] }, '$daysinbudget'] },
                                remainingamt: { $subtract: ['$amount', { $multiply: [{ $divide: ['$amount', '$originaldaysinbudget'] }, '$daysinbudget'] }] },
                                endmonth: '$endmonth',
                                startmonth: '$startmonth'
                            }
                        },
                        {
                            $project: {
                                '_id': 0,
                                start: '$start',
                                end: '$end',
                                status: '$status',
                                type: '$type',
                                daysinbudget: '$daysinbudget',
                                originaldaysinbudget: '$originaldaysinbudget',
                                endmonth: '$endmonth',
                                startmonth: '$startmonth',
                                x: '$amount',
                                y: '$remainingamt',
                                amount: {
                                    $cond: {
                                        if: {
                                            $ne: ['$startmonth', m.toString()]
                                        },
                                        then: 0,
                                        else: '$amount'
                                    }
                                },

                                remainingamt: {
                                    $cond: {
                                        if: {
                                            $ne: ['$startmonth', (m - 1).toString()]
                                        },
                                        then: 0,
                                        else: '$remainingamt'
                                    }
                                }

                            }
                        },
                        { $group: { _id: null, totalremaining: { $sum: '$remainingamt' }, total: { $sum: '$amount' } } },
                        {
                            $project: {
                                '_id': 0,
                                totalbudget: { $add: ['$totalremaining', '$total'] }
                            }
                        },
                    ],
                    "Spent": [{ $unwind: '$trans' },
                        { $project: { '_id': 0, t: '$trans' } },
                        { $project: { '_id': 0, t: '$t', month: { $month: '$t.transdate' } } },
                        { $match: { month: { $eq: parseInt(m, 10) } } },
                        { $group: { _id: '$t.store', total: { $sum: { $sum: '$t.itemprice' } } } },
                        { $project: { '_id': 0, total: '$total' } },
                        { $group: { _id: null, totalspent: { $sum: { $sum: '$total' } } } },
                        { $project: { '_id': 0, totalspent: '$totalspent' } }
                    ],
                    "StoresVisited": [
                        { $unwind: '$trans' },
                        { $project: { store: '$trans.store', transmonth: { $month: '$trans.transdate' } } },
                        { $match: { transmonth: { $eq: parseInt(m, 10) } } },
                        { $group: { _id: '$store' } },
                        { $project: { _id: 0, store: '$_id' } }
                    ],
                    "TopSpendingStore": [
                        { $project: { '_id': 0, 't': '$trans' } },
                        { $unwind: '$t' },
                        { $project: { store: '$t.store', price: '$t.itemprice', transmonth: { $month: '$t.transdate' } } },
                        { $match: { transmonth: { $eq: parseInt(m, 10) } } },
                        { $group: { _id: '$store', total: { $sum: '$price' } } },
                        { $sort: { 'total': -1 } },
                        { $project: { '_id': 0, 'store': '$_id', 'totalspent': '$total' } },
                        { $limit: 1 }
                    ],
                    "SpendingByPaymentType": [
                        { $unwind: '$trans' },
                        { $project: { _id: '$_id', BudgetType: '$BudgetType', price: '$trans.itemprice', transmonth: { $month: '$trans.transdate' } } },
                        { $match: { transmonth: { $eq: parseInt(m, 10) } } },
                        { $group: { _id: '$BudgetType', total: { $sum: '$price' } } },
                        { $project: { '_id': 0, 'BudgetType': '$_id', 'total': '$total' } },
                        { $sort: { 'total': -1 } }
                    ],
                    "MostActivity": [
                        { $unwind: '$trans' },
                        { $project: { '_id': 0, totalspent: '$trans.store', transmonth: { $month: '$trans.transdate' } } },
                        { $match: { transmonth: { $eq: parseInt(m, 10) } } },
                        { $group: { _id: '$totalspent', count: { $sum: 1 } } },
                        { $project: { _id: 0, store: '$_id', count: { $max: '$count' }, } },
                        { $sort: { count: -1 } }
                    ],
                    "AvgSpentPerStore": [
                        { $unwind: '$trans' },
                        { $project: { store: '$trans.store', price: '$trans.itemprice', transmonth: { $month: '$trans.transdate' } } },
                        { $match: { transmonth: { $eq: parseInt(m, 10) } } },
                        { $group: { _id: '$store', total: { $sum: '$price' }, visitsperstore: { $sum: 1 } } },
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