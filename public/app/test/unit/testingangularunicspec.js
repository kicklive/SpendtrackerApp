describe('Testing AngularJS Test Suite', function() {
    describe('Testing AngularJS Controller', function() {
        //it(string to describe the name of the text, function to implement the text)
        it('controller should initialize the title in the scope', function() {
            module('spendtrackerapp');
            var scope = {};
            var ctrl;
            //inject is an angular-mocks function
            inject(function($controller) { //$controller===>controller service
                ctrl = $controller('ViewBudgetController', { $scope: scope }); //scope var will be linked to the scope of the controller. Can access any variables there in the controller
            });
            //jasmin expect and matches
            //expects(scope.title).toBeDefined(); //each expection is made up of the value you want to check, and some condition you want to check it against.
            expects(scope.title).toBe("SpendTracker");
        });
    });
});