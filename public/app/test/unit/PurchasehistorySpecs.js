describe('Testing Purchase History', function() {
    var $httpBackend, $q, $state, $templateCache, $location, deferred, $scope, $controller, PurchaseHistoryController;

    var purchaseHistoryServiceMock = jasmine.createSpyObj('PurchaseHistoryService', ['GetAll', 'GetByUPC', 'GetByDates']);
    var budgetServiceMock = jasmine.createSpyObj('budgetservice', ['budgetStatus', 'getBudgetList', 'saveBudget', 'CheckAndUpdate']);

    beforeEach(function() {;
        module('spendtrackerapp', 'ui.router', mockServices);
        inject(services);
        setUp();
    })

    function mockServices($provide) {;
        $provide.factory('PurchaseHistoryService', function() {;
            return purchaseHistoryServiceMock;
        });
        $provide.factory('budgetservice', function() {;
            return budgetServiceMock;
        });
    }

    function services($injector) {
        $q = $injector.get('$q');
        $httpBackend = $injector.get('$httpBackend');
        $state = $injector.get('$state');
        $templateCache = $injector.get('$templateCache');
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $filter = $injector.get('$filter');
        $scope = $rootScope.$new();
    }

    function setUp() {
        deferred = $q.defer();
    }


    /**Intial applicaton entry...config test. Will probably need this in every test spec unless find another way to do it */
    describe('testing default application entry in config ', function() {
        it('will return call method and return results', function() {
            $httpBackend.whenGET('/').respond(200, {});
            // goTo('/');
            deferred.resolve({
                'data': [{}]
            });
            budgetServiceMock.getBudgetList.and.returnValue(deferred.promise);

            budgetServiceMock.getBudgetList().then(function(returnedPromise) {
                setUp();
                deferred.resolve('dummy');

                budgetServiceMock.budgetStatus.and.returnValue(deferred.promise);
                budgetServiceMock.budgetStatus().then(function(ret) {});
                $httpBackend.whenGET("/partials/budgetsviews/budgetview").respond(200, {});
            });
            $scope.$apply();

        });
    });

    describe('testing transition resolve', function() {
        function goTo(url) {
            $location.url(url);
            $httpBackend.flush();
        }
        it('will successfully redirect to transaction page', function() {
            $httpBackend.whenGET("/partials/transactionsviews/NewTransaction").respond(200, {});
            goTo('/Transaction');
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
        it('Purchase History Service should exist', function() {
            expect(purchaseHistoryServiceMock.GetAll).toBeDefined();
        });

        var data = [{ 'upc': '123456789012', 'item': 'bread', 'store': 'Target', 'date': '7/24/2018', 'budgetstart': '7/23/2018', 'budgetend': '7/25/2018', 'transdate': '2018-07-23T04:00:00.000Z' },
            { 'upc': '123456789013', 'item': 'milk', 'store': 'Target', 'date': '7/24/2018', 'budgetstart': '7/23/2018', 'budgetend': '7/25/2018', 'transdate': '7/15/2018' },
            { 'upc': '123456789014', 'item': 'soap', 'store': 'Walmart', 'date': '6/24/2018', 'budgetstart': '6/20/2018', 'budgetend': '6/27/2018', 'transdate': '7/25/2018' }
        ];
        describe('testing service', function() {

            it('Purchase History Service should exist', function() {
                expect(purchaseHistoryServiceMock.GetAll).toBeDefined();
                expect(purchaseHistoryServiceMock.GetByUPC).toBeDefined();
                expect(purchaseHistoryServiceMock.GetByDates).toBeDefined();
            });
            //create mock promise
            it('will return data for GetAll', function() {
                var ret;

                deferred.resolve(data);

                purchaseHistoryServiceMock.GetAll.and.returnValue(deferred.promise);
                purchaseHistoryServiceMock.GetAll().then(function(returnedPromise) {
                    debugger;
                    ret = returnedPromise;
                });
                $scope.$apply();
                debugger;
                expect(ret).toEqual(data);
                expect(ret.length).toEqual(3);
            });
            it('will return data for GetByUPC', function() {
                var ret;
                deferred.resolve(data);
                purchaseHistoryServiceMock.GetByUPC.and.returnValue(deferred.promise);
                purchaseHistoryServiceMock.GetByUPC('123456789013').then(function(returnedPromise) {
                    debugger;
                    ret = returnedPromise;
                });
                $scope.$apply();
                expect(($filter('filter')(ret, { upc: '123456789013' }, true)[0]).item).toEqual('milk');
            })
            it('will return data for GetByDates', function() {
                var ret;
                deferred.resolve(data);
                purchaseHistoryServiceMock.GetByDates.and.returnValue(deferred.promise);
                purchaseHistoryServiceMock.GetByDates('7/25/2018').then(function(returnedPromise) {
                    debugger;
                    ret = returnedPromise;
                });
                $scope.$apply();
                expect(($filter('filter')(ret, { transdate: '7/25/2018' }, true)[0]).item).toEqual('soap');
            })
        });

        describe('testing PurchaseHistory controller', function() {
            it('should return correct values from variables and functions', function() {
                PurchaseHistoryController = $controller('PurchaseHistoryController', {});
                PurchaseHistoryController.search = '123';
                expect(PurchaseHistoryController).toBeDefined();
                expect(PurchaseHistoryController.search).toBeDefined();
                expect(PurchaseHistoryController.search).toBe('123');
                expect(PurchaseHistoryController.HideAllBoxes()).toBe(true);
                expect(PurchaseHistoryController.formatDate(data)[0].transdate).toEqual('July 23, 2018');
            });
        });

    });

});