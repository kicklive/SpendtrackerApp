describe('Testing AngularJS Test Suite', function() {
    beforeEach(module('spendtrackerapp'));
    describe('Test BudgetDataService', function() {
        it('should have a working BudgetDataService', function() {});
        it('form data should pass successfully (post)', function() {});
        it('get budget data (get)', function() {});
        it('budget by id (get/put)', function() {});
    });

    describe('Test StorageService', function() {
        it('save session', function() {});
        it('retrieve session', function() {});
    });


    describe('Testing AngularJS Controller', function() {
        var scope = {};
        var ctrl;
        //inject is an angular-mocks function

        beforeEach(inject(function($controller) { //$controller===>controller service
            ctrl = $controller('ViewBudgetController', { $scope: scope }); //scope var will be linked to the scope of the controller. Can access any variables there in the controller
        }));


        it('controller should initialize the title in the scope', function() {
            //jasmin expect and matches
            expect(scope.title).toBeDefined(); //each expection is made up of the value you want to check, and some condition you want to check it against.
            expect(scope.title).toBe("SpendTracker");

        });
    });

    describe('Dummy data factory', function() {
        var d;
        var filter;
        beforeEach(inject(function(_DummyDataService_, _$filter_) {
            d = _DummyDataService_;
            filter = _$filter_;
        }));
        // beforeEach(inject(function($injector) {
        //     d = $injector.get('DummyDataService');
        //     filter = $injector.get('sumByKeyFilter');
        // }));

        it('should exists', function() {
            expect(d).toBeDefined();
            expect(filter('sumByKey')).toBeDefined();
            expect(filter('sumByKey')(d.getData(), 'itemprice')).toBe(27);

            // expect(filter).toBeDefined();
            // expect(filter(d.getData(), 'itemprice')).toBe(27);
        });
    });


});