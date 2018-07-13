describe('Testing SpendTracker App', function() {
    var $httpBackend, $q, $state, $templateCache, $location, deferred, fakePromise, $scope, data, result, ret, $controller, createController;

    var budgetServiceMock = jasmine.createSpyObj('budgetservice', ['budgetStatus', 'getBudgetList']);
    var storageserviceMock = jasmine.createSpyObj('storageservice', ['get', 'set', 'setObj', 'getObj']);

    function mockServices($provide) {;
        $provide.factory('budgetservice', function() {;
            return budgetServiceMock;
        });
        $provide.factory('storageservice', function() {;
            return storageserviceMock;
        });
    }


    function services($injector) {;
        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        $state = $injector.get('$state');
        $templateCache = $injector.get('$templateCache');
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();
        transactionService = $injector.get('transactionservice');
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
        $httpBackend.whenGET('/').respond(200, {});
        deferred = $q.defer();
    }

    beforeEach(function() {;
        module('spendtrackerapp', 'ui.router', mockServices);
        inject(services);
        setUp();
    })


    describe('when navigating to ' / '', function() {
        function goTo(url) {
            $location.url(url);
            console.log($location);
            $httpBackend.flush();
        }


        describe('testing get default ', function() {
            // var params = {
            //     'keyexists': 'haskey',
            //     'keynotexist': 'nokey'
            // }
            // var ret;
            // var p = 'keynotexist';
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
                    // storageserviceMock.get.and.callFake(function() {
                    //     return params[p];
                    // });
                    // storageserviceMock.set.and.callFake(function() {
                    //     return params[p];
                    // });
                    // storageserviceMock.setObj.and.callFake(function() {
                    //     return params[p];
                    // });
                    ;
                    setUp();
                    deferred.resolve(
                        'success'
                    );


                    budgetServiceMock.budgetStatus.and.returnValue(deferred.promise);
                    budgetServiceMock.budgetStatus().then(function(returnedPromise) {;
                        storResults = returnedPromise;
                    });
                    result = returnedPromise;
                });

                ;

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

        describe('testing transition resolve', function() {
            it('will successfully redirect to transaction page', function() {
                $httpBackend.whenGET("/partials/transactionsviews/NewTransaction").respond(200, {});
                goTo('/Transaction');
                // expect('/partials/transactionsviews/NewTransaction').
            });

        });
    });
    describe('testing viewBudgetsController', function() {
        it('should have a passed param', function() {;
            $controller('ViewBudgetController', { $scope: $scope });;
            // $scope.CCtype = 'Amex';
            expect(storageserviceMock.getObj).toHaveBeenCalled();
            expect((storageserviceMock.getObj()).length).toEqual(2);
            expect((storageserviceMock.getObj())[1].BudgetAmount).toEqual(300);
            expect($scope.budgets.length).toEqual(2);
            expect($scope.budgets[1].BudgetAmount).toEqual(300);
            expect($scope.findDiff($scope.budgets[1])).toEqual(19);
            expect($scope.CCtype).toBeUndefined;

        });
    });

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
                //debugger;
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
                //debugger;
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

});


// describe('testing budget status', function() {
//     // it('will test access', function() {
//     //     deferred.resolve('yes');
//     //     storageserviceMock.get.and.returnValue(deferred.promise)

//     //     storageserviceMock.get('status', null).then(function(returnedPromise) {
//     //         result = returnedPromise;
//     //     });

//     //     ;
//     //     console.log('xxxxxx=>' + storageserviceMock.get('status', null));
//     //     expect(storageserviceMock.get).toHaveBeenCalled();
//     //     expect(storageserviceMock.get.value).toBe('yes');
//     // });
//     beforeEach(function() {
//         var params = {
//             'keyexists': 'haskey',
//             'keynotexist': 'nokey'
//         }
//         var ret;
//         var p = 'keyexists';
//         ;
//         storageserviceMock.get.and.callFake(function() {
//             return params[p];
//         });
//         ;
//         deferred.resolve(
//             'success'
//         );
//         budgetServiceMock.budgetStatus.and.returnValue(deferred.promise);
//         // storageserviceMock.set('status', new Date());
//         budgetServiceMock.budgetStatus().then(function(returnedPromise) {
//             ;
//             storResults = returnedPromise;
//         });

//         // budgetServiceMock.budgetStatus.and.callFake(function() {
//         //     return 'success';
//         // });
//         // if (ret != null) {
//         //     budgetServiceMock.budgetStatus.and.callFake(function() {
//         //         return 'success';
//         //     });
//         // }
//     });

//     var storResults;

//     it('will return results of status check', function() {


//         // deferred.resolve(
//         //     'success'
//         // );
//         // budgetServiceMock.budgetStatus.and.returnValue(deferred.promise);
//         // // storageserviceMock.set('status', new Date());
//         // budgetServiceMock.budgetStatus().then(function(returnedPromise) {
//         //     ;
//         //     storResults = returnedPromise;
//         // });
//         $rootScope.$apply();
//         //   $httpBackend.whenGET("/partials/budgetsviews/budgetview").respond(200, {});
//         // goTo('/');
//         expect(storageserviceMock.get).toHaveBeenCalled();
//         expect(storageserviceMock.get('keyexists')).toBe('haskey')
//         expect(budgetServiceMock.budgetStatus).toHaveBeenCalled();
//         expect(storResults).toBe('success');
//     });
// });












// var $locationProvider, $stateProvider;
// beforeEach(function() {
//     angular.module('locationProviderConfig', [])
//         .config(function(_$locationProvider_, $state) {
//             $locationProvider = _$locationProvider_;
//             $stateProvider = $state
//             spyOn($locationProvider, 'html5Mode');
//         });
//     module('locationProviderConfig');
//     module('spendtrackerapp');
//     inject();
// });
//beforeEach(module('ui.router'));
// beforeEach(function() {
//     module(function(_$locationProvider_, _$stateProvider_) {
//         $locationProvider = _$locationProvider_;
//         spyOn($locationProvider, 'html5Mode');
//     });
//     module('spendtrackerapp');
//     inject();
// });
// it('should set html5 mode', function() {
//     expect($locationProvider.html5Mode)
//         .toHaveBeenCalledWith(true);
// });





// var storageserviceMock, budgetserviceMock, state = 'startpage',
//     $rootScope, $state, $injector;
// beforeEach(function() {
//     module(function(_$locationProvider_, $provide) {
//         $provide.value('storageservice', storageserviceMock = {}, 'budgetservice', budgetserviceMock = {});
//         $locationProvider = _$locationProvider_;
//         // $state = _$state_;
//     });
//     module('spendtrackerapp');
//     inject(function(_$rootScope_, _$state_, _$injector_) {
//         $rootScope = _$rootScope_.$new();
//         $state = _$state_;
//         //$state = $stateProvider;
//         $injector = _$injector_;

//     });
// });
// it('should resolve data', function() {
//     storageserviceMock.get = jasmine.createSpy('get').and.returnValue('get');
//     budgetserviceMock.budgetStatus = jasmine.createSpy('budgetStatus').and.returnValue('budgetStatus');
//     // earlier than jasmine 2.0, replace "and.returnValue" with "andReturn"
//     $state.go(state);
//     // $state.go(state);
//     // $state = $state.get('startpage');
//     $rootScope.$apply();
//     expect($state.current.controller).toBe(state);

//     // Call invoke to inject dependencies and run function
//     //expect($state.resolve.check()).toBe('get');
//     //expect(storageserviceMock.get).toHaveBeenCalled();
//     //$injector.invoke($state.get(state).resolve['check'])
//     //expect($injector.invoke($state.get(state).resolve['access'])).toHaveBeenCalled();
//     //expect($injector.invoke($state.current.resolve.access)).toBe('get');
// });
// //  var $stateProvider;




// beforeEach(module('ui.router', function(_$stateProvider_) {
//     $stateProvider = _$stateProvider_;
//     // spyOn($stateProvider, 'state');
// }, 'spendtrackerapp'));

// it('must have a route state for home', function() {
//     expect($stateProvider.state).toHaveBeenCalledWith('/', jasmine.any(Object));
// });

// describe('Test budgetservice gets', function() {
//     var budgetService, httpBackend, deferred, $q, result, scope, result2, result3, pullDeferred;
//     beforeEach(inject(function(_budgetservice_, $httpBackend, _$q_, _$rootScope_) {
//         budgetService = _budgetservice_;
//         httpBackend = $httpBackend;
//         $q = _$q_;
//         scope = _$rootScope_.$new();

//         deferred = $q.defer();

//         deferred.resolve(
//             [{
//                 id: 1,
//                 itemdesc: 'aaa',
//                 itemprice: 5
//             }, {
//                 id: 2,
//                 itemdesc: 'bbb',
//                 itemprice: 3
//             }, {
//                 id: 3,
//                 itemdesc: 'ccc',
//                 itemprice: 7
//             }, {
//                 id: 4,
//                 itemdesc: 'ddd',
//                 itemprice: 12
//             }]
//         );
//         //  pullDeferred = $q.defer();
//         //   pullDeferred.resolve({ data: 'success!' });

//     }));

//     it('getBudgetList should return array of budgetitems (using spy)', function() {
//         spyOn(budgetService, 'getBudgetList').and.returnValue(deferred.promise);
//         budgetService.getBudgetList().then(function(returnedPromise) {
//             result = returnedPromise;
//         });
//         scope.$apply();
//         expect(budgetService.getBudgetList).toHaveBeenCalled();
//         expect(result.length).toBe(4);
//         expect(result[0].itemdesc).toEqual('aaa');
//     });


//     it('should get budget details by budgetId', function() {
//         spyOn(budgetService, 'getBudgetDetails').and.returnValue(deferred.promise);
//         budgetService.getBudgetDetails(4).then(function(returnedPromise) {
//             result2 = returnedPromise;
//         });
//         scope.$apply();
//         expect(budgetService.getBudgetDetails).toHaveBeenCalledWith(4);
//         expect(result2).toContain(jasmine.objectContaining({ id: 4 }));
//     });
// });

// it('set budget status to open or closed', function() {

//     //  result = null;
//     spyOn(budgetService, 'budgetStatus').and.returnValue(deferred.promise);
//     budgetService.budgetStatus().then(function(returnedPromise) {
//         result3 = returnedPromise;
//     });
//     scope.$apply();
//     expect(budgetService.budgetStatus).toHaveBeenCalled();
//     expect(result3).toEqual('success!')
// });









// it('getBudgetList should return array of budgetitems (using httpGET)', function() {
//     httpBackend.whenGET('/data/budgetlist').respond(
//         [{
//             id: 1,
//             itemdesc: 'aaa',
//             itemprice: 5
//         }, {
//             id: 2,
//             itemdesc: 'bbb',
//             itemprice: 3
//         }, {
//             id: 3,
//             itemdesc: 'ccc',
//             itemprice: 7
//         }, {
//             id: 4,
//             itemdesc: 'ddd',
//             itemprice: 12
//         }]
//     );
//     budgetService.getBudgetList().then(function(d) {
//         expect(d.data[3].itemprice).toEqual(12);
//     });

//     httpBackend.flush();




// });