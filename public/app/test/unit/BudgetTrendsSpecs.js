describe("Testing BudgetTrends History", function() {
    var $httpBackend,
        $q,
        $state,
        $location,
        deferred,
        $scope,
        $controller,
        BudgetTrendsController;

    var budgetTrendsServiceMock = jasmine.createSpyObj(
        "BudgetTrendsService", ["GetTrends"]
    );
    var budgetServiceMock = jasmine.createSpyObj("budgetservice", [
        "budgetStatus",
        "getBudgetList",
        "saveBudget",
        "CheckAndUpdate"
    ]);



    beforeEach(function() {
        module("spendtrackerapp", "ui.router", mockServices);
        inject(services);
        setUp();
    });

    function mockServices($provide) {
        $provide.factory("BudgetTrendsService", function() {
            return budgetTrendsServiceMock;
        });
        $provide.factory("budgetservice", function() {
            return budgetServiceMock;
        });
    }

    function services($injector) {
        $q = $injector.get("$q");
        $httpBackend = $injector.get("$httpBackend");
        $state = $injector.get("$state");
        $location = $injector.get("$location");
        $rootScope = $injector.get("$rootScope");
        $controller = $injector.get("$controller");
        $filter = $injector.get("$filter");
        $scope = $rootScope.$new();
    }

    function setUp() {
        deferred = $q.defer();
    }

    /**Intial applicaton entry...config test. Will probably need this in every test spec unless find another way to do it */
    describe("testing default application entry in config ", function() {
        it("will return call method and return results", function() {
            $httpBackend.whenGET("/").respond(200, {});
            // goTo('/');
            deferred.resolve({
                data: [{}]
            });
            budgetServiceMock.getBudgetList.and.returnValue(deferred.promise);

            budgetServiceMock.getBudgetList().then(function(returnedPromise) {
                setUp();
                deferred.resolve("dummy");

                budgetServiceMock.budgetStatus.and.returnValue(deferred.promise);
                budgetServiceMock.budgetStatus().then(function(ret) {});
                $httpBackend
                    .whenGET("/partials/budgetsviews/budgetview")
                    .respond(200, {});
            });
            $scope.$apply();
        });
    });
    describe("when navigating to /BudgetTrends", function() {
        function goTo(url) {
            $location.url(url);
            $httpBackend.flush();
        }
        it("will display page", function() {
            $httpBackend
                .whenGET('/partials/budgetsviews/BudgetTrends')
                .respond(200, {});
            goTo("/BudgetTrends");
            expect($state.current.name).toBe("budgettrends");
        });

        var data = [{
                upc: "123456789012",
                item: "bread",
                store: "Target",
                date: "7/24/2018",
                budgetstart: "7/23/2018",
                budgetend: "7/25/2018",
                transdate: "2018-07-23T04:00:00.000Z"
            },
            {
                upc: "123456789012",
                item: "milk",
                store: "Target",
                date: "7/24/2018",
                budgetstart: "7/23/2018",
                budgetend: "7/25/2018",
                transdate: "7/15/2018"
            },
            {
                upc: "123456789014",
                item: "soap",
                store: "Walmart",
                date: "6/24/2018",
                budgetstart: "6/20/2018",
                budgetend: "6/27/2018",
                transdate: "7/25/2018"
            }
        ];
        describe('testing BudgetTrendsService', function() {
            it('BudgetTrendsService should exist', function() {
                expect(budgetTrendsServiceMock.GetTrends).toBeDefined();
            });
            it("will return data for GetTrends", function() {
                var ret;
                var upc = '123456789012'
                deferred.resolve(data);
                budgetTrendsServiceMock.GetTrends.and.returnValue(deferred.promise);
                budgetTrendsServiceMock
                    .GetTrends(upc)
                    .then(function(returnedPromise) {
                        debugger;
                        ret = returnedPromise;
                    });
                $scope.$apply();
                expect(
                    $filter("filter")(ret, { upc: upc }, true).length).toEqual(2);
            });
        });
        describe('Testing BudgetTrendsController', function() {
            it('should return correct values from variables and functions', function() {
                BudgetTrendsController = $controller('BudgetTrendsController', {});
                expect(BudgetTrendsController).toBeDefined();
            });

        });


    });
});