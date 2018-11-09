describe('testing userservice', function() {
    var $httpBackend,
        $q,
        $state,
        $templateCache,
        $location,
        deferred,
        $scope,
        $controller,
        PurchaseHistoryController;

    var userServiceMock = jasmine.createSpyObj('userservice', [
        'login',
        'register',
        'logOut'

    ]);
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
        $provide.factory('userservice', function() {
            return userServiceMock;
        });
        $provide.factory('budgetservice', function() {
            return budgetServiceMock;
        });
    }

    function services($injector) {
        $q = $injector.get("$q");
        $httpBackend = $injector.get("$httpBackend");
        $state = $injector.get("$state");
        $templateCache = $injector.get("$templateCache");
        $location = $injector.get("$location");
        $rootScope = $injector.get("$rootScope");
        $controller = $injector.get("$controller");
        $filter = $injector.get("$filter");
        $scope = $rootScope.$new();
    }

    function setUp() {
        deferred = $q.defer();
    }

    describe("testing default application entry in config ", function() {
        it("will return call method and return results", function() {
            $httpBackend.whenGET("/").respond(200, {});
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

    describe('testing userservice login', function() {
        it('will pass user credentials and return successful login', function() {
            // $httpBackend.when('POST', '/data/addproduct', function(d) {
            //     //debugger;
            //     jsonData = JSON.parse(d);
            //     expect(jsonData[1].ItemDescription).toBe('Milk');
            //     expect(jsonData[1].Price).toBe('4.89');
            //     expect(jsonData[1].UPC).toBe('123456789013');
            //     return true;
            // }).respond(200, true);


            // itemService.Save(data);
            // $httpBackend.flush();

        });

    });


})