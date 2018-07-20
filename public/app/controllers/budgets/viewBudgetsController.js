(function() {
    'use strict';

    angular
        .module('spendtrackerapp')
        .controller('ViewBudgetController', ViewBudgets)

    ViewBudgets.$inject = ['$scope', 'dataShare', 'budgetservice', '$filter', 'STConstants', 'storageservice', '$state', '$stateParams'];

    function ViewBudgets($scope, dataShare, budgetservice, $filter, STConstants, storageservice, $state, $stateParams) {

        activate();

        function activate() {
            debugger;
            getData();
            console.log();

            $scope.ShowLink = function(v) {
                debugger;
                console.log('show link--> ' + v);
                var retStatus = true;
                if (v == 'Future')
                    retStatus = false;
                return retStatus;
            }
        }

        function getData() {
            // debugger;
            if (storageservice.getObj('budgets', 'empty') == 'empty') {
                budgetservice.getBudgetList().then(function(data) {
                    debugger;
                    //     d = data.data;
                    $scope.budgets = data.data
                    $scope.results = 'success';
                    debugger;
                    console.log('aaa=' + $scope.budgets[0].BudgetStatus);
                    console.log("second budget");
                }).catch(function() {
                    $scope.error = 'There was an issue getting the budget list. Contact Administrator.'
                });
            } else {

                $scope.budgets = storageservice.getObj('budgets', 'empty');
            }

            $scope.findDiff = function(budget) {
                var todaysDate = new Date();
                var fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

                fromDate = fromDate.setDate(fromDate.getDate());
                var toDate = new Date(budget.BudgetEndDate);
                var budgetFromDate = new Date(budget.BudgetStartDate);
                toDate = toDate.setHours(0, 0, 0, 0);

                var remainingDates = 0;
                if (fromDate && toDate) {
                    if (fromDate < budgetFromDate) {
                        remainingDates = 'N/A';
                    } else {
                        console.log(Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
                        remainingDates = Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));

                        if (Math.round((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)) > 0)
                            remainingDates = 0;

                    }
                    return remainingDates;
                }
            }
            $scope.CCtype
        }
    }
})();