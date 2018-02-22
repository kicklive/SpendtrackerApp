(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('ViewBudgetController', ViewBudgets)

    ViewBudgets.$inject = ['$scope', 'dataShare', 'budgetservice'];

    function ViewBudgets($scope, dataShare, budgetservice) {

        activate();


        function activate() {
            getData();



        }
        var budgetData = null;

        function getData() {
            $scope.$on('data_shared', function() {
                budgetData = dataShare.getData();
                $scope.budgets = budgetData.data
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
                var fromDate = todaysDate;
                fromDate = fromDate.setDate(fromDate.getDate() - 2);
                var toDate = budget.BudgetEndDate;
                var x = null;
                if (fromDate && toDate) {
                    x = Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                    return x;
                }
            }

            // function findDiff(fromDate, fromDate) {
            //     if (fromDate && fromDate) {
            //         return Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
            //     }
            // }






        }


    }
})();