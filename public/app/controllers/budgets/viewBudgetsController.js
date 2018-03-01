(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('ViewBudgetController', ViewBudgets)

    ViewBudgets.$inject = ['$scope', 'dataShare', 'budgetservice', '$filter', 'STConstants'];

    function ViewBudgets($scope, dataShare, budgetservice, $filter, ) {

        activate();


        function activate() {
            getData();
        }

        var budgetData = null;

        function getData() {
            $scope.$on('data_shared', function() {
                budgetData = dataShare.getData();
                $scope.budgets = budgetData.data;
                console.log("first budget");
                //  $scope._id=data[1]._id,
                //  $scope.startDate=data[1].BudgetStartDate,
                //  $scope.endDate=data[1].BudgetEndDate,
                //  $scope.budgetAmount=data[1].BudgetAmount
            });
            $scope.$emit('initiateEvent', null);
            if (budgetData == null) {
                budgetservice.getBudgetList().then(function(data) {
                    $scope.budgets = data.data
                    console.log("second budget");
                });
            }
            $scope.findDiff = function(budget) {
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate() - 1);
                var toDate = new Date(budget.BudgetEndDate);
                toDate = toDate.setHours(0, 0, 0, 0);

                var x = null;
                if (fromDate && toDate) {
                    return Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                }
            }
            $scope.CCtype
        }


    }
})();