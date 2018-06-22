describe('Testing SpendTracker App', function() {
    var $httpBackend, $q, $state, $templateCache, $location, deferred, fakePromise, $scope, data, result;

    var budgetServiceMock = jasmine.createSpyObj('budgetservice', ['budgetStatus', 'getBudgetList']);
    var storageserviceMock = jasmine.createSpyObj('storageservice', ['get', 'set', 'setObj']);

    function mockServices($provide) {
        debugger;
        $provide.factory('budgetservice', function() {
            debugger;
            return budgetServiceMock;
        });
        $provide.factory('storageservice', function() {
            debugger;
            return storageserviceMock;
        });
    }


    function services($injector) {
        debugger;
        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        $state = $injector.get('$state');
        $templateCache = $injector.get('$templateCache');
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
    }


    function setUp() {
        $httpBackend.whenGET('/').respond(200, {});
        deferred = $q.defer();


    }
    beforeEach(function() {
        debugger;
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


        describe('testing get budgetlist ', function() {
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
                    result = returnedPromise;
                });

                debugger;

                $httpBackend.whenGET("/partials/budgetsviews/budgetview").respond(200, {});
                goTo('/');
                expect(budgetServiceMock.getBudgetList).toHaveBeenCalled();
                expect(result.data.length).toEqual(4);

            });
        });

        describe('testing budget status', function() {
            it('will return results of status check', function() {
                debugger;
                deferred.resolve({
                    data: 'success'
                });
                budgetServiceMock.budgetStatus.and.returnValue(deferred.promise);
                budgetServiceMock.budgetStatus().then(function(returnedPromise) {
                    result = returnedPromise;
                });
                //   $httpBackend.whenGET("/partials/budgetsviews/budgetview").respond(200, {});
                goTo('/');
                expect(budgetServiceMock.budgetStatus).toHaveBeenCalled();
                // expect(result.data).toBe('successs');
            });
        });


    });









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








});