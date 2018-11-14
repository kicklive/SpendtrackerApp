describe('testing userservice', function() {
    var $httpBackend,
        $q,
        $state,
        $templateCache,
        $location,
        deferred,
        $scope,
        $controller,
        userService,
        PurchaseHistoryController;

    // var userServiceMock = jasmine.createSpyObj('userservice', [
    //     'login',
    //     'register',
    //     'logOut'

    // ]);
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
        // $provide.factory('userservice', function() {
        //     return userServiceMock;
        // });
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
        userService= $injector.get("userservice");
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
        var loginData={uid:'thisuser',pwd:'abc123'};
        var dbData=[{uid:'thisuser',pwd:'abc123'}];
        var jsonData;
        beforeEach(function(){
            $httpBackend.when('GET', '/data/login').respond(200, { data: dbData });
            $httpBackend.when('GET', '/data/logOut').respond(200, { data: true });
        });
        it('will pass user credentials and return successful login', function() {
            debugger;
           userService.login(loginData).then(function(d){
               debugger;
               //jsonData=JSON.parse(d);
               
            expect(userService).toBeDefined();
            expect(d.data.data[0].pwd).toBe('abc123');
            expect(
                $filter("filter")(d.data.data, { uid: 'thisuser' }, true)[0].pwd
            ).toEqual("abc123");
           });
           $httpBackend.flush();
        });
        it('will register a new user',function(){
            debugger;
            $httpBackend.when('POST', '/data/register', function(d) {
                debugger;
                jsonData = JSON.parse(d);
                expect(jsonData.uid).toBe('thisuser');
                expect(jsonData.pwd).toBe('abc123');
                return true;
            }).respond(200, true);
            debugger;
           userService.register(loginData);
            $httpBackend.flush();
        });
        it('will logout user',function(){
userService.logOut().then(function(d){
expect(d).toBe(true);
});
        });

    });


})