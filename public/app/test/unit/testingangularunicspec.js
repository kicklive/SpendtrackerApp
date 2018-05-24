describe('Testing AngularJS Test Suite', function() {
    beforeEach(module('spendtrackerapp'));
    describe('AuthCtrl', function() {
        var $q;
        var $location;
        var $controller;
        var AuthenticationService;
        var $route;
        var deferred;
        var scope;
        var $httpBackend;

        beforeEach(inject(function(_$controller_, _$rootScope_, _storageservicespec_, _budgetservice_, _$q_, _$location_, _$route_, _$httpBackend_) {

            scope = _$rootScope_.$new();
            budgetservice = _budgetservice_;
            storageservice = _storageservicespec_;
            $location = _$location_;
            $route = _$route_;
            $controller = _$controller_;
            $q = _$q_;
            $httpBackend = _$httpBackend_
            deferred = $q.defer();
            deferred.resolve(
                [{
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
            );

            // spyOn(storageservice, 'getObj').and.returnValue(deferred.promise);
            //spyOn(budgetservice, 'budgetStatus').and.returnValue(deferred.promise);
            $httpBackend.expectPUT('/data/updatestatusall/').respond({ data: 'success!' });
            $httpBackend.flush();
            spyOn(budgetservice, 'getBudgetList').and.returnValue(deferred.promise);
            //spyOn($location, 'url');

            AuthCtrl = $controller('ViewBudgetController', {
                $scope: scope,
                budgetservice: budgetservice,
                storageservice: storageservice,
                $route: $route,
                $location: $location
            });

        }));


        it('fufill promise', function() {
            var result;
            budgetservice.getBudgetList().then(function(returnedPromise) {
                result = returnedPromise;
            });

            scope.$apply();
            expect(result.length).toBe(5);
            //expect(scope.error).toBe('here');
            // expect($location.url).toHaveBeenCalledWith('/');
        });


        // it('should reject promise', function() {
        //     // This will call the .catch function in the controller
        //     deferred.reject();

        //     // We have to call apply for this to work
        //     scope.$apply();

        //     // Since we called apply, not we can perform our assertions
        //     expect(scope.results).toBe(undefined);
        //     expect(scope.error).toBe('There has been an error!');
        // });
    });





    // describe('Test BudgetDataService', function() {
    //     var bs;
    //     var httpBE;
    //     beforeEach(inject(function(_budgetservice_, $httpBackend, _$q_, $controller, _$rootScope_) {
    //         budgetservice = _budgetservice_;
    //         httpBackend = $httpBackend;
    //         controller = $controller;
    //         $scope = _$rootScope_;
    //         $q = _$q_;
    //         deferred = _$q_.defer();

    //         spyOn(budgetservice, 'getBudgetList').and.returnValue(deferred.promise);

    //         $controller('ViewBudgetController', {
    //             $scope: $scope,
    //             budgetservice: budgetservice
    //         });
    //     }));
    //     it('should have a working BudgetDataService', function() {
    //         expect(budgetservice).toBeDefined();
    //     });


    //     // afterEach(function() {
    //     //     httpBackend.verifyNoOutstandingExpectation();
    //     //     httpBackend.verifyNoOutstandingRequest();
    //     // });

    //     it('get budget data (get)', function() {

    //         httpBackend.when('GET', '/data/budgetlist').
    //         respond(200, [
    //             { BudgetAmt: 200, BudgetStatus: 'Closed' },
    //             { BudgetAmt: 300, BudgetStatus: 'Open' },
    //             { BudgetAmt: 400, BudgetStatus: 'Closed' },

    //         ]);
    //         // budgetservice.getBudgetList().then(function(d) {
    //         //         expect(d.data.length).toEqual(4);
    //         //     })
    //         httpBackend.flush();
    //     });





    //     it('form data should pass successfully (post)', function() {

    //     });



    //     it('budget by id (get/put)', function() {});
    // });

    // describe('Test StorageService', function() {
    //     it('save session', function() {});
    //     it('retrieve session', function() {});
    // });


    // describe('Testing AngularJS Controller', function() {
    //     var scope = {};
    //     var ctrl;
    //     //inject is an angular-mocks function

    //     beforeEach(inject(function($controller) { //$controller===>controller service
    //         ctrl = $controller('ViewBudgetController', { $scope: scope }); //scope var will be linked to the scope of the controller. Can access any variables there in the controller
    //     }));


    //     it('controller should initialize the title in the scope', function() {
    //         //jasmin expect and matches
    //         expect(scope.title).toBeDefined(); //each expection is made up of the value you want to check, and some condition you want to check it against.
    //         expect(scope.title).toBe("SpendTracker");

    //     });
    // });

    // describe('Dummy data factory', function() {
    //     var d;
    //     var filter;
    //     beforeEach(inject(function(_DummyDataService_, _$filter_) {
    //         d = _DummyDataService_;
    //         filter = _$filter_;
    //     }));
    //     // beforeEach(inject(function($injector) {
    //     //     d = $injector.get('DummyDataService');
    //     //     filter = $injector.get('sumByKeyFilter');
    //     // }));

    //     it('should exists', function() {
    //         expect(d).toBeDefined();
    //         expect(filter('sumByKey')).toBeDefined();
    //         expect(filter('sumByKey')(d.getData(), 'itemprice')).toBe(27);

    //         // expect(filter).toBeDefined();
    //         // expect(filter(d.getData(), 'itemprice')).toBe(27);
    //     });
    // });


});