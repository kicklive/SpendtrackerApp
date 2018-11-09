describe("Testing Item Search ", function() {
    var $httpBackend,
        $q,
        $state,
        $location,
        deferred,
        $scope,
        $controller,
        BudgetTrendsController;



    var budgetServiceMock = jasmine.createSpyObj("budgetservice", [
        "budgetStatus",
        "getBudgetList",
        "saveBudget",
        "CheckAndUpdate",
    ]);

    beforeEach(function() {
        module("spendtrackerapp", "ui.router", mockServices);
        inject(services);
        setUp();
    });

    function mockServices($provide) {
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
        itemService = $injector.get('itemservice');
    }

    function setUp() {
        deferred = $q.defer();
    }
    var data = [{
        _id: 1,
        UPC: '123456789012',
        ItemDescription: 'Bread',
        Price: '2.89'
    }, {
        _id: 2,
        UPC: '123456789013',
        ItemDescription: 'Milk',
        Price: '4.89'
    }, {
        _id: 3,
        UPC: '123456789014',
        ItemDescription: 'Cheese',
        Price: '1.99'
    }]
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

    describe('Testing ItemSearchController', function() {
        it('should return correct values from variables and functions', function() {
            ItemSearchController = $controller('ItemSearchController', {});
            expect(ItemSearchController).toBeDefined();
        });

    });

    describe("when navigating to /EditProduct", function() {
        function goTo(url) {
            $location.url(url);
            $httpBackend.flush();
        }
        it("will display page edititem", function() {
            $httpBackend
                .whenGET('/partials/itemsviews/edititem')
                .respond(200, {});
            goTo("/EditProduct");
            expect($state.current.name).toBe("edititem");
        });
        it("will display page searchitem", function() {
            $httpBackend
                .whenGET('/partials/itemsviews/searchitem')
                .respond(200, {});
            goTo("/SearchItem");
            expect($state.current.name).toBe("itemsearch");
        });
    });
    describe('will test the service', function() {
        beforeEach(function() {
                $httpBackend.when('GET', '/data/searchallitems').respond(200, { data: data });
                $httpBackend.when('GET', '/data/itemsearch').respond(200, { data: data });
                $httpBackend.when('GET', '/data/itemsearchbyid').respond(200, { data: data });
            }

        );

        it('should save new product (Save)', function() {
            $httpBackend.when('POST', '/data/addproduct', function(d) {
                //debugger;
                jsonData = JSON.parse(d);
                expect(jsonData[1].ItemDescription).toBe('Milk');
                expect(jsonData[1].Price).toBe('4.89');
                expect(jsonData[1].UPC).toBe('123456789013');
                return true;
            }).respond(200, true);


            itemService.Save(data);
            $httpBackend.flush();
        });
        it('should update product (Update)', function() {
            var existingData, updatedData;
            existingData = { _id: 1, ItemDescription: 'milk', Price: '2.89' };
            updatedData = { _id: 1, ItemDescription: 'milk', Price: '2.19' };
            $httpBackend.when('PUT', '/data/updateproduct', function(existingData) {
                return true;
            }).respond(200, updatedData);
            itemService.Update(updatedData).then(function(d) {
                //debugger;
                results = d.data;
                expect(results.Price).toEqual('2.19');
            });
            $httpBackend.flush();
        });
        // it('should delete product (DeleteItem)', function() {
        //     var existingData, updatedData;
        //     existingData = { _id: 1, ItemDescription: 'milk', Price: '2.89' };
        //     updatedData = {};
        //     $httpBackend.when('PUT', '/data/deleteproduct', function(existingData) {
        //         return true;
        //     }).respond(200, updatedData);
        //     itemService.DeleteItem(updatedData).then(function(d) {
        //         //debugger;
        //         results = d.data;
        //         expect(results.Price).toBeUndefined();
        //     });
        //     $httpBackend.flush();
        // });
        it('should return all product (SearchForAllProduct)', function() {
            itemService.SearchForAllProduct().then(function(d) {
                //debugger;
                expect(d.data.data[1].ItemDescription).toBe('Milk');
                expect(d.data.data[1].Price).toBe('4.89');
                expect(d.data.data[1].UPC).toBe('123456789013');
            });
            $httpBackend.flush();
        });

        it('should return product by upc (GetItem)', function() {
            itemService.GetItem().then(function(d) {
                //debugger;
                expect(
                    $filter("filter")(d.data.data, { UPC: '123456789012' }, true)[0].ItemDescription
                ).toEqual("Bread");
            });
            $httpBackend.flush();
        });

        it('should return product by id (SearchById)', function() {
            itemService.SearchById().then(function(d) {
                //debugger;
                expect(
                    $filter("filter")(d.data.data, { _id: 1 }, true)[0].ItemDescription
                ).toEqual("Bread");
            });
            $httpBackend.flush();
        });

    })
});