describe('Testing SpendTracker App', function() {
    var $httpBackend, $q, $state, $templateCache, $location, deferred, fakePromise, $scope, data, result, ret, $controller, createController,
        newBudgetController, compareData, postedData, statusResults, sumByKeyFilter, BudgetDetailsController, DateCountService, NewTransactionController, itemservice,
        $localscope, ItemSearchController;

    var budgetServiceMock = jasmine.createSpyObj('budgetservice', ['budgetStatus', 'getBudgetList', 'saveBudget', 'CheckAndUpdate']);
    var storageserviceMock = jasmine.createSpyObj('storageservice', ['get', 'set', 'setObj', 'getObj', 'clear']);
    var itemserviceMock = jasmine.createSpyObj('itemservice', ['GetItem']);
    // var purchaseHistoryServiceMock = jasmine.createSpyObj('PurchaseHistoryService', ['GetAll', 'GetByUPC', 'GetByDate']);

    function mockServices($provide) {;
        $provide.factory('budgetservice', function() {;
            return budgetServiceMock;
        });
        $provide.factory('storageservice', function() {;
            return storageserviceMock;
        });

        $provide.factory('itemservice', function() {;
            return itemserviceMock;
        });

        // $provide.factory('PurchaseHistoryService', function() {;
        //     return purchaseHistoryServiceMock;
        // });
    }


    function services($injector) {
        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        $state = $injector.get('$state');
        $templateCache = $injector.get('$templateCache');
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();
        transactionService = $injector.get('transactionservice');
        // itemservice = $injector.get('itemservice');
        DateCountService = $injector.get('DateCountService');
        sumByKeyFilter = $injector.get('sumByKeyFilter');
    }


    function setUp() {
        var params = {
            'keyexists': 'haskey',
            'keynotexist': 'nokey'
        }
        var ret;
        var p = 'keynotexist';
        storageserviceMock.get.and.callFake(function() {
            return params[p];
        });
        storageserviceMock.set.and.callFake(function() {
            return params[p];
        });
        storageserviceMock.setObj.and.callFake(function() {
            return params[p];
        });


        storageserviceMock.getObj.and.callFake(function() {
            return [{
                'BudgetAmount': 100,
                'Budgettype': '1',
                'BudgetStatus': 'Closed',
                'BudgetEndDate': '5/10/2018'
            }, {
                'BudgetAmount': 300,
                'Budgettype': '2',
                'BudgetStatus': 'Open',
                'BudgetEndDate': '8/1/2018'
            }]
        });
        // itemserviceMock.GetItem.and.callFake(function() {
        //     return [{
        //         'upc': '123456789012',
        //         'item': 'bread',
        //         'price': '3.00'
        //     }, {
        //         'upc': '222222222222',
        //         'item': 'milk',
        //         'price': '2.89'
        //     }]
        // });

        $httpBackend.whenGET('/').respond(200, {});
        deferred = $q.defer();
    }

    beforeEach(function() {;
        module('spendtrackerapp', 'ui.router', mockServices);
        inject(services);
        setUp();
    })

    /**Testing controllers********************/
    describe('when navigating to ' / '', function() {
        function goTo(url) {
            $location.url(url);
            console.log($location);
            $httpBackend.flush();
        }

        describe('testing get default ', function() {
            it('will return call method and return results', function() {
                deferred.resolve({
                    'data': [{
                        id: 1,
                        itemdesc: 'aaa',
                        itemprice: 5
                    }, {
                        id: 2,
                        itemdesc: 'bbb',
                        itemprice: 3
                    }, {
                        id: 3,
                        itemdesc: 'ccc',
                        itemprice: 7
                    }, {
                        id: 4,
                        itemdesc: 'ddd',
                        itemprice: 12
                    }]
                });
                budgetServiceMock.getBudgetList.and.returnValue(deferred.promise);

                budgetServiceMock.getBudgetList().then(function(returnedPromise) {
                    setUp();
                    deferred.resolve(
                        'success'
                    );


                    budgetServiceMock.budgetStatus.and.returnValue(deferred.promise);
                    budgetServiceMock.budgetStatus().then(function(retrPrms) {
                        storResults = retrPrms;
                    });
                    result = returnedPromise;
                });



                $httpBackend.whenGET("/partials/budgetsviews/budgetview").respond(200, {});
                goTo('/');
                expect(budgetServiceMock.getBudgetList).toHaveBeenCalled();
                expect(storageserviceMock.get).toHaveBeenCalled();
                expect(storageserviceMock.get('keyexists')).toBe('nokey')
                expect(budgetServiceMock.budgetStatus).toHaveBeenCalled();
                expect(storResults).toBe('success');
                expect(result.data.length).toEqual(4);
            });
        });
        describe('testing viewBudgetsController', function() {
            it('should have a passed param', function() {;
                $controller('ViewBudgetController', { $scope: $scope });
                expect(storageserviceMock.getObj).toHaveBeenCalled();
                expect((storageserviceMock.getObj()).length).toEqual(2);
                expect((storageserviceMock.getObj())[1].BudgetAmount).toEqual(300);
                expect($scope.budgets.length).toEqual(2);
                expect($scope.budgets[1].BudgetAmount).toEqual(300);
                expect($scope.CCtype).toBeUndefined;
            });
        });

        describe('testing transition resolve', function() {
            it('will successfully redirect to transaction page', function() {
                $httpBackend.whenGET("/partials/transactionsviews/NewTransaction").respond(200, {});
                goTo('/Transaction');
            });

        });
    });


    describe('when navigating to /NewBudget', function() {
        function goTo(url) {
            $location.url(url);
            $httpBackend.flush();
        }

        beforeEach(function() {
            compareData = { 'budgetEnd': '8/1/2018', 'budgetBegin': '7/1/2018', 'budgetAmt': '$100', 'budgetStatus': 'open', 'budgetType': 'Amex' };
            ////debugger;
            newBudgetController = $controller('newbudgetcontroller', { $scope: $scope, budgetServiceMock: budgetServiceMock });
        });


        it('should exist', function() {
            expect(newBudgetController).toBeDefined();
        });

        describe('testing newbugetcontrolller', function() {
            it('Will go to details page and execute methods', function() {
                $httpBackend.whenGET("/partials/budgetsviews/newbudget").respond(200, {});
                goTo('/NewBudget');
            });
            it('should pass correct new budget data', function() {
                postedData = { 'budgetEnd': '8/1/2018', 'budgetBegin': '7/1/2018', 'budgetAmt': '$100', 'budgetStatus': 'open', 'budgetType': 'Amex' };
                deferred.resolve(compareData);
                budgetServiceMock.saveBudget.and.returnValue(deferred.promise);
                budgetServiceMock.saveBudget(postedData).then(function(returnedPromise) {
                    result = returnedPromise;

                });
                ////debugger;
                $scope.$apply();
                $scope.addbudget();

                expect(result.budgetAmt).toEqual('$100');
                expect(result.budgetAmt).toEqual(postedData.budgetAmt);
                expect(result).toEqual(postedData);
                expect($scope.budgetType.options[0].name).toBe('Amex');
            });

        });
    });
    describe('when navigating to /Details', function() {
        function goTo(url) {
            $location.url(url);
            $httpBackend.flush();
        }
        // deferred = $q.defer();
        beforeEach(function() {
            ////debugger;
            BudgetDetailsController = $controller('BudgetDetailsController', { $scope: $scope });
        });


        it('should exist', function() {
            expect(BudgetDetailsController).toBeDefined();
        });
        describe('Testing BudgetDetailsController', function() {

            var d = { 'BudgetEndDate': '7/29/2018' };
            it('Will go to details page and execute methods', function() {
                $httpBackend.whenGET("/partials/budgetsviews/budgetDetails").respond(200, {});
                goTo('/Details');
            });
            it('will test scope methods', function() {
                var status = $scope.ShowLink('Closed');
                //debugger;
                var dateDiff = $scope.findDiff(d);
                expect(status).toBe(false);
                // expect(dateDiff).toBe(3);
            })
        });
    });

    describe('when navigating to /NewTransaction', function() {
        // function goTo(url) {
        //     $location.url(url);
        //     $httpBackend.flush();
        // }

        beforeEach(function() {
            NewTransactionController = $controller('NewTransactionController', { $scope: $scope });
        });
        it('should exist', function() {
            expect(NewTransactionController).toBeDefined();
        });
        describe('testing NewTransactionController', function() {
            it('should have a passed param', function() {
                $scope.upc = '123456789012';
                deferred.resolve({
                    'id': '123456789012',
                    'disable': true
                });
                var retPrms;
                itemserviceMock.GetItem.and.returnValue(deferred.promise);
                itemserviceMock.GetItem($scope.upc).then(function(returnedPromise) {
                    retPrms = returnedPromise;
                    if (retPrms.id == $scope.upc)
                        $scope.disabled = true;
                });
                $scope.$apply();
                $scope.EvalUPC();
                expect(itemserviceMock.GetItem).toHaveBeenCalled();
                expect($scope.disabled).toEqual(true);
                expect(retPrms.id).toEqual($scope.upc);
            });
        });
    });


    /**Testing services and filters**************/
    describe('testing transactionDataService', function() {
        var jsonData, results;
        var postDummyData = {
            'itemdescription': 'bread',
            'itemprice': '$5.00',
            'transdate': '7/13/2018',
            'store': 'Target',
            'upc': '7779311'
        }
        it('should pass correct data to db', function() {
            $httpBackend.when('POST', '/data/SaveTransaction', function(formData) {
                jsonData = JSON.parse(formData);
                expect(jsonData.itemdescription).toBe('bread');
                expect(jsonData.itemprice).toBe('$5.00');
                expect(jsonData.transdate).toBe('7/13/2018');
                expect(jsonData.store).toBe('Target');
                expect(jsonData.upc).toBe('7779311');
                return true;
            }).respond(200, true);
            transactionService.addTransaction(postDummyData);
            $httpBackend.flush();
        });

        it('should get trans data from db by passed param', function() {
            var tranId = '0'
                //////debugger;
            $httpBackend.when('GET', '/data/gettrandetails/?id=' + tranId, function() {}).respond(200, [{
                'id': '1',
                'ret': 'milk'
            }, {
                'id': '2',
                'ret': 'cheese'
            }]);

            transactionService.GetTransactionData(tranId).then(function(response) {
                results = response.data;
                expect(results[tranId].ret).toEqual('milk');
            });
            $httpBackend.flush();
        });

        it('should update existing data', function() {
            var existingData, updatedData;
            existingData = { 'id': '1', 'ret': 'milk' };
            updatedData = { 'id': '1', 'ret': 'juice' };
            $httpBackend.when('PUT', '/data/updatetransaction', function(existingData) {
                return true;
            }).respond(200, updatedData);
            transactionService.SaveTransaction(updatedData).then(function(response) {
                results = response.data;
                expect(results.ret).toEqual('juice');
            });
            $httpBackend.flush();
        });


        it('should delete transaction from db', function() {
            var tranId = '0'
                //////debugger;
            $httpBackend.when('GET', '/data/deletetransaction/?id=' + tranId, function() {}).respond(200, 'success');



            transactionService.DeletTrans(tranId).then(function(response) {
                results = response.data;
                expect(results).toEqual('success');
            });
            $httpBackend.flush();
        });
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });

    describe('Testing summing filter', function() {
        it('should add values correctly', function() {
            var values = [{ 'amt': 5 }, { 'amt': 9 }];
            expect(sumByKeyFilter(values, 'amt')).toEqual(14);
        });
    });

    describe('testing DateCountService service', function() {
        it('should calculate the correct number of days between provided dates (returns a negative nubmer)' +
            'if number of days are gerater than 0',
            function() {
                var numDays = DateCountService.getDays('7/19/2018', '7/30/2018');
                expect(numDays).toEqual(-11);
            });
    });

    describe('when navigating to /PurchaseHistory', function() {
        function goTo(url) {
            $location.url(url);
            $httpBackend.flush();
        }
        it('will display page', function() {
            $httpBackend.whenGET('/partials/transactionsviews/purchasehistory').respond(200, {});
            goTo('/PurchaseHistory');
            expect($state.current.name).toBe('purchasehistory');
        });
    });

    describe('Testing ItemSearchController', function() {
        it('should return correct values from variables and functions', function() {
            ItemSearchController = $controller('ItemSearchController', {});
            expect(ItemSearchController).toBeDefined();
        });

    });

    // describe('testing service', function() {
    //     it('Purchase History Service should exist', function() {
    //         expect(purchaseHistoryServiceMock.GetAll).toBeDefined();
    //     });
    //     //create mock promise
    //     it('will return data for GetAll', function() {
    //         var ret;
    //         var data = [{ 'upc': '123456789012', 'item': 'bread', 'store': 'Target', 'date': '7/24/2018', 'budgetstart': '7/23/2018', 'budgetend': '7/25/2018' },
    //             { 'upc': '123456789013', 'item': 'milk', 'store': 'Target', 'date': '7/24/2018', 'budgetstart': '7/23/2018', 'budgetend': '7/25/2018' },
    //             { 'upc': '123456789014', 'item': 'soap', 'store': 'Walmart', 'date': '6/24/2018', 'budgetstart': '6/20/2018', 'budgetend': '6/27/2018' }
    //         ];
    //         deferred.resolve(data);

    //         purchaseHistoryServiceMock.GetAll.and.returnValue(deferred.promise);
    //         purchaseHistoryServiceMock.GetAll().then(function(returnedPromise) {
    //             //debugger;
    //             ret = returnedPromise;
    //         });
    //         $scope.$apply();
    //         expect(ret).toEqual(data);
    //     });


    // });

});