(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('BudgetDetailsController', BudgetDetails)

    BudgetDetails.$inject = ['$scope', '$route', 'budgetservice'];

    function BudgetDetails($scope, $route, budgetservice) {
        $scope.data = {};

        activate();

        function activate() {
            budgetservice.getBudgetDetails($route.current.pathParams.budgetId).then(function(data) {
                $scope.data = data.data;
            });

            $scope.findDiff = function(d) {
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate() - 1);
                var toDate = new Date(d.BudgetEndDate);
                toDate = toDate.setHours(0, 0, 0, 0);

                var x = null;
                if (fromDate && toDate) {
                    return Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                }
            }
            $scope.ShowMsg = function() {
                return "false";
            }


        }
    }
})();